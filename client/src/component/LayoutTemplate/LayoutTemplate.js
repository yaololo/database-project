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

  onClickHandler(item, event){
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
            return (
              <div key={i} className="content">
                <div className="picture">
                  <img src={element.image.split(',')[0]} alt="" onClick= {this.onClickHandler.bind(this, this.item)}/>
                  <br/>
                </div>
                <div className="short-description">
                  {element.p_name}
                </div>
                <br/>
                <div className="item-price">
                  {`$${element.unit_price}`}
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
