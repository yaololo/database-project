import React, { Component } from 'react';
import './DetailedPage.css'
import {   
  mapSessionContextToProps, 
  sessionContextPropType, 
  sessionCartInfoPropType, 
  mapItemsToCart,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../context_helper";
import { addToCart, bookMarkItem } from '../utils/utils';
import { ProviderContext, subscribe } from "react-contextual";
import { withRouter } from "react-router";
import Messages from '../Message/Message';
class DetailedPage extends Component {
  static propTypes = {
    ...sessionContextPropType,
    ...messageContextPropType,
    ...sessionCartInfoPropType
  };

  constructor(){
    super();
    this.state = { quantity: 1 }
  }

  onChangeHandler(event){
    event.preventDefault();
    this.setState({ quantity: event.target.value });
  }

  bookMarkHandler(event){
    this.props.messageContext.clearMessages();
    if(this.props.sessionContext.user.id === undefined){
      this.props.history.push('/login')
    }else{
      bookMarkItem(this.props.location.state.key.product_id, this.props.sessionContext, this.props.messageContext);
    }
  }

  addToCartHandler(event){
    this.props.messageContext.clearMessages();
    if(this.props.sessionContext.user.id === undefined){
      this.props.history.push('/login')
    }else{
      addToCart(this.props.location.state.key.product_id, this.props.sessionContext, this.state.quantity, this.props.messageContext, this.props.sessionCartInfo);
    }
  }
  
  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  render() {
    return (
    <div className="container">
      <div className="card">
      <Messages messages={this.props.messageContext.messages} />
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="tab-content">
                <img src={this.props.location.state.key.image.split(',')[0]} alt=""/>
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{this.props.location.state.key.p_name}</h3>
              <div className="rating">
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                
              </div>
              <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
              <p className="product-description">Suspendisse quos? Tempus cras iure temporibuctus posuere.</p>
              <h4 className="price">current price: <span>${this.props.location.state.key.unit_price}</span>
              </h4>
              <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
              <div></div>
              <h5 className="colors">colors:
                <span className="color orange" data-toggle="tooltip" title="Not In store"></span>
                <span className="color green"></span>
                <span className="color blue"></span>
              </h5>
              <div className="qty-counter">
                  <span>Quantity: </span>
                  <input type="number" name="quantity" min="1" maxLength="4" size="4" value={this.state.quantity} onChange={this.onChangeHandler.bind(this)}/>
              </div>
              <div className="action">
                <button className="add-to-cart btn btn-default" type="button" onClick={this.addToCartHandler.bind(this)}>add to cart</button>
                <button className="like btn btn-default bookmark-icon" type="button" onClick={this.bookMarkHandler.bind(this)}><span className="fa fa-heart "></span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapMessageContextToProps(context),
    ...mapItemsToCart(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withRouter(DetailedPage)
);