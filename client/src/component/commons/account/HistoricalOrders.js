import React, { Component } from 'react';
import {
  mapSessionContextToProps,
  sessionContextPropType,
  messageContextPropType,
  mapMessageContextToProps,
} from "../../../context_helper"
import { ProviderContext, subscribe } from "react-contextual";
import './BookmarkedItems.css';
import './HistoricalOrders.css';
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
          <div className="history-order-content">
            <div className="title"><h1>Order History</h1></div>
              {this.state.data.map((obj, i) => {
                let orderId = obj.id;
                let subTotal =0;
                return(
                  <div key={i} className="historical-order-card">
                    <div className="historical-order-item">
                      <div className="text-center">Order ID</div>
                      <div>Placed On</div>
                      <div></div>
                      <div>Product Name</div>
                      <div>Unit Price</div>
                      <div className="order-history-quantity" >Quantity </div>
                    </div>
                      {obj.details.map((element, idx) => {
                        let date = element.orderDate.substring(0, 10);
                        subTotal= Number(subTotal) + Number(element.Price)*Number(element.quantity).toFixed(2);
                        return(
                          <div key={idx} className="historical-order-item">
                            <div className="text-center">{orderId}</div>
                            <div>{date}</div>
                            <div><img src={element.image.split(',')[0]} alt=""/></div>
                            <div>{element.name}</div>
                            <div>{`$${element.Price}`}</div>
                            <div className="order-history-quantity">{element.quantity}</div>
                          </div>
                        )
                      })}
                       <div className="historical-order-subtotal"><span><h4>Subtotal: {`$${subTotal}`}</h4></span></div>
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
