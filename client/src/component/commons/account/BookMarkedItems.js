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
  }

  removeBookmark(event){
    event.preventDefault();
    // let user = { token: 'true', customerId: this.props.sessionContext.user.id }
    // let productId = this.state.data[event.target.value]
    // fetch('/api/delete_bookmark_item', {
    //   method: "delete",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     user: user,
    //     productId: productId
    //   })
    // }).then(response => {
    //   if (response.ok) {
    //     response.json().then(json => {
    //       this.props.messageContext.setSuccessMessages(json.msg),
    //       this.isDelete = true;
    //     });
    //   } else {
    //     response.json().then(json =>
    //       console.log(json.msg)
    //     //  this.setErrorMessages(json.msg)
    //     );
    //   }
    // });
    // if(this.isDelete === true){
    //   let newState = this.state.data.splice(event.target.value, 1);
    //   this.setState({data: newState});
    //   this.isDelete = false;
    // }
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
          // if(json.data.length === 0) this.noBookMarkedItems =true;
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
          <div className="bookmarked-item-content">
           <Messages messages={this.props.messageContext.messages} />
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
                    <button type="button" className="btn btn-danger" value={i} onClick={this.removeBookmark.bind(this)} >
                      <i className="fas fa-trash-alt"></i> Remove
                    </button>
                  </div>
                </div>
                )
              })}
          </div>
        );
      // }
    }else {
      return(
        <div>loading</div>
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
