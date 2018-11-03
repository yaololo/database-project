import React, { Component } from 'react';
import {
  mapSessionContextToProps,
  sessionContextPropType,
  messageContextPropType,
  mapMessageContextToProps,
} from "../../../context_helper"
import { ProviderContext, subscribe } from "react-contextual";
import './BookmarkedItems.css';
import Messages from '../../Message/Message';
class BookMarkedItems extends Component {
   static propTypes = {
    ...sessionContextPropType,
    ...messageContextPropType
  };
  constructor(props){
    super(props);
    this.state={
      data:[]
    }
    this.tempState = []
    this.noBookMarkedItems = false
    this.isUpdate = false;
    this.isDelete = false;
    this.newState = [];
  }

  removeBookmark(event){
    event.preventDefault();
    this.newState = this.tempState;
    this.newState.splice(event.target.value, 1);
    let user = { token: 'true', customerId: this.props.sessionContext.user.id }
    let productId = event.target.name
    fetch('/api/delete_bookmark_item', {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user,
        productId: productId
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.props.messageContext.setSuccessMessages(json.msg);
          setTimeout(() => {
            this.props.messageContext.clearMessages()
          }, 1500);
          this.tempState = this.newState;
          this.isUpdate = false;
        });
      } else {
        response.json().then(json =>
          console.log(json.msg)
        //  this.setErrorMessages(json.msg)
        );
      }
    });
  }

  componentDidUpdate(){
    if(this.isUpdate === false){
      this.setState({ data: this.tempState })
      this.isUpdate = true;
    }
  }

  componentDidMount() {
    fetch('/api/view_bookmark_item', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: this.props.sessionContext.user.id
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          // console.log(json.data)
          this.tempState= json.data;
          this.setState({ data: json.data })
        });
      } else {
        response.json().then(json =>
          console.log('app crash')
        //  this.setErrorMessages(json.msg)
        );
      }
    });
  }

  render() {
    // if(this.isUpdate ){
      if(this.state.data.length > 0){
        return (
          <div>
          <Messages messages={this.props.messageContext.messages} />
          <div className="bookmarked-item-content">
            <div className="title"><h1>BookMarked</h1></div>
            <div className="bookmarked-item">
                <div></div>
                <div>Product Name</div>
                <div>Price</div>
                <div></div>
            </div>
              {this.state.data.map((element, i) => {
                return(
                <div key={i} className="bookmarked-item">
                  <div><img src={element.image.split(',')[0]} alt=""/></div>
                  <div>{element.p_name}</div>
                  <div>{`$${element.unit_price}`}</div>
                  <div className="text-right">
                    <button type="button" className="btn btn-danger" name={element.product_id} value={i} onClick={this.removeBookmark.bind(this)} >
                      <i className="fas fa-trash-alt"></i> Remove
                    </button>
                  </div>
                </div>
                )
              })}
          </div>
          </div>
        );
      // }
    }else {
      return(
        <div>
          <h1>Cart is empty</h1>
        </div>
      )
    }
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    // ...mapItemsToCart(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  BookMarkedItems
);
