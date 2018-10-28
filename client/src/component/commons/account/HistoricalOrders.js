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
class HistoricalOrders extends Component {
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

  componentDidUpdate(){
    if(this.isUpdate === false){
      this.setState({ data: this.tempState })
      this.isUpdate = true;
    }
  }

  componentDidMount() {
    fetch('/api/cust_order_hist', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: this.props.sessionContext.user.id
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          // if(json.data.length === 0) this.noBookMarkedItems =true;
          console.log(json.data)
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
            <div className="title"><h1>Order History</h1></div>
            <div className="order-item">
                <div>Product Name</div>
                <div className="order-history-quantity" >Quantity </div>
            </div>
              {this.state.data[0].map((element, i) => {
                return(
                <div key={i} className="order-item">
                  {/* <div><img src={element.image.split(',')[0]} alt=""/></div> */}
                  <div>{element.p_name}</div>
                  <div className="order-history-quantity">{element.TOTAL}</div>
                  {/* <div className="text-right">
                    <button type="button" className="btn btn-danger" value={i} onClick={this.removeBookmark.bind(this)} >
                      <i className="fas fa-trash-alt"></i> Remove
                    </button>
                  </div> */}
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
  HistoricalOrders
);
