import React, { Component } from 'react';
import './CheckOutConfirmation.css'
import Messages from '../Message/Message';
import { placeOrder } from '../utils/utils';
import { 
  mapMessageContextToProps,  
  mapSessionContextToProps,
  mapItemsToCart,
  sessionCartInfoPropType,
  sessionContextPropType,
  messageContextPropType
} from '../../context_helper';
import { withRouter } from "react-router";
import { ProviderContext, subscribe } from "react-contextual";

class CheckOutConfirmation extends Component {
  static propTypes = {
    ...sessionContextPropType,
    ...sessionCartInfoPropType,
    ...messageContextPropType
  };

  placeOrderHandler(e){
    e.preventDefault();
    placeOrder( 
      this.props.location.state.addressInfo, 
      this.props.sessionContext, 
      this.props.messageContext, 
      this.props.location.state.productInfoList 
      );
  }
  render() {
    return (
      <div>
         <Messages messages={this.props.messageContext.messages} />
        <div className="order-details">
          <div>
          <h1>Order Confirmation</h1>
          </div>
          <div><h3>Order Details</h3></div>
          <div className="product-details">
            <div></div>
            <div><h4>Product Name</h4></div>
            <div><h4>Quantity</h4></div>
            <div><h4>Price</h4></div>
          </div>
            {this.props.location.state.productInfoList.map((element, i) => {
              return(
                <div className="product-details">
                  <div><img src={element.productDetails[0].image.split(',')[0]} alt=""/></div>
                  <div>{element.productDetails[0].p_name}</div>
                  <div>{element.quantity}</div>
                  <div>{`$${element.productDetails[0].unit_price}`}</div>
                </div>
              )
            })}
            <div><h3>Address & Contact Information</h3></div>
          <div className="order-address">
           <div>
            <div>Receiver</div>
            <div>Contact</div>
            <div>Street Name</div>
            <div>Country</div>
            <div>City</div>
            <div>Postcode</div>
            </div>
            <div>
              <div>{this.props.location.state.addressInfo.receiver}</div>
                <div>{this.props.location.state.addressInfo.contact}</div>
                <div>{this.props.location.state.addressInfo.street}</div>
                <div>{this.props.location.state.addressInfo.country}</div>
                <div>{this.props.location.state.addressInfo.city}</div>
                <div>{this.props.location.state.addressInfo.postcode}</div>
              </div>
          </div>
          <div className="confirmation">
          <button className="btn btn-success" >Place Order </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapItemsToCart(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withRouter(CheckOutConfirmation)
);
