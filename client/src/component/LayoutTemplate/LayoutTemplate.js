import React, { Component } from 'react';
import './LayoutTemplate.css';
import { mapItemsToCart, mapSessionContextToProps, sessionContextPropType } from '../../context_helper';
import { ProviderContext, subscribe } from "react-contextual";
import { withRouter } from 'react-router-dom'

class LayoutTemplate extends Component {
  static propTypes = {
    ...sessionContextPropType
  };
  constructor(props) {
    super()
    this.state = {
      data: props.data
    };
  }

  // addToCartHandler(event){
  //   event.preventDefault();

  //   updateCart(event.target.value, this.props.sessionContext.user.id)
  //   console.log(JSON.stringify(event.target.value))
  //   // this.props.itemsId.push(event.target.value)
  //   this.props.itemsWithQty = mapArrayToObject(this.props.itemsId)
  // }

  onClickHandler(item, event){
    console.log(item)
    this.props.history.push({
      pathname:`/product/${item.product_id}`,
      state:{
          key:item
       }
     });
  }

  render() {
    if (this.props.data !== undefined ) {
      return (
        <div className="container">
        <div className="product-list">
          {this.props.data.map((element, i) => {
            this.item =element;
            // this.props.singleItem = element;
            return (
              <div key={i} className="content">
                <div className="picture">
                  <img src={element.image.split(',')[0]} alt="" />
                </div>
                <div className="short-description">
                  {element.p_name}
                </div>
                <div className="price">{element.description}</div>
                <div className="short-description">
                  {`$${element.unit_price}`}
                </div>
                <div className="purchase-button">
                  <button 
                    className="order-button" 
                    type="button" 
                    value = {element.product_id}
                    onClick= {this.onClickHandler.bind(this, this.item)}
                    >
                    Add to cart
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {/* <ReactLoading
            type={'spin'}
            color={'#ffffff'}
            height={'5%'}
            width={'5%'}
          /> */}
        </div>
      );
    }
  }
}
const mapCartToProps = context => {
  return {
    ...mapItemsToCart(context),
    ...mapSessionContextToProps(context)
  };
};

export default subscribe( ProviderContext, mapCartToProps ) ( withRouter(LayoutTemplate) );
