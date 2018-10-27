import React, { Component } from 'react';
import { withRouter } from "react-router";
import { mapSessionContextToProps, sessionContextPropType, sessionCartInfoPropType, mapItemsToCart } from "../../context_helper"
import { ProviderContext, subscribe } from "react-contextual";
import './ShoppingCart.css';
import { getItemDetails } from "../utils/utils";

class ShoppingCart extends Component {
  static propTypes = {
    ...sessionContextPropType,
    ...sessionCartInfoPropType
  };

  constructor(props){
    super(props);
    this.state={ data: props.sessionCartInfo.cartProductInfoList}
    this.isUpdated = false;
    this.isFetched = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.sessionCartInfo.cartProductInfoList
    })
  }

  componentWillMount(){
    if(this.props.sessionContext.token === 'true' && this.isFetched === false){
      getItemDetails(this.props.sessionContext.user.id, this.props.sessionContext.token, this.props.sessionCartInfo);
      this.isFetched= true;
      this.isUpdated= false;
    }
  }

  componentDidUpdate(){
    if(this.isFetched === true && this.props.sessionCartInfo.noOfItems > 0 && this.isUpdated === false){
      if(this.props.sessionCartInfo.cartProductInfoList.length > 0){
        this.setState({data: this.props.sessionCartInfo.cartProductInfoList});
        this.isUpdated = true;
      }
    }

    if( this.props.sessionContext.token === 'true' && this.isFetched === false){
      getItemDetails(this.props.sessionContext.user.id, this.props.sessionContext.token, this.props.sessionCartInfo);
      this.isFetched = true;
    }
  }


  onChangeHandler(product ,event){
    event.preventDefault();
    this.setState({ quantity: event.target.value });
  }

  removeItemHandler(event){
    event.preventDefault();
    this.props.sessionCartInfo.cartProductInfoList.splice(event.target.value, 1);
    let newState = this.props.sessionCartInfo.cartProductInfoList;
    this.setState({data: newState});
  }

  continueShopping(e){
    this.props.history.push('/')
  }

  checkOutHandler(e){
    this.props.history.push({
      pathname:`/checkout/address`,
      state:{
          productInfoList: this.props.sessionCartInfo.cartProductInfoList,
          userInfo: this.props.sessionContext.user
       }
     });
  }

  render() {
    if(this.props.sessionCartInfo.noOfItems <= 0){
      return (
        <div className="container text-center">
          <h1>Your Cart is empty.</h1>
          <button className="btn btn-default" onClick={this.continueShopping.bind(this)}>Continue Shopping <i className="fas fa-shopping-cart"></i></button>
        </div>
      )
    }
    if( this.state.data.length !== 0 && this.isUpdated === true){
      return (
        <div className="container cart-card">
          <div className="row">
              <div className="col-10">
                  <div className="table-responsive">
                      <table className="table ">
                          <thead>
                              <tr>
                                <th scope="col" max-width="100"> </th>
                                <th scope="col">Product</th>
                                <th scope="col">Available</th>
                                <th scope="col" className="text-center" width="50">Quantity</th>
                                <th scope="col" className="text-right" width="100">Price</th>
                                <th scope="col" className="text-right" width="150"> </th>
                              </tr>
                          </thead>
                          <tbody>
                          {this.state.data.map((element, i) => {
                            return (
                                <tr key={i}>
                                    <td width="120"><img src={element.productDetails[0].image.split(',')[0]} alt=""/> </td>
                                    <td>{element.productDetails[0].p_name}</td>
                                    <td>In stock</td>
                                    <td><input className="text-center cart-input-quantity" width="80" type="number" name="quantity" maxLength="4" size="4" value={element.quantity}/></td>
                                    <td className="text-right">{`$${element.productDetails[0].unit_price}`}</td>
                                            <td className="text-right">
                                    <button type="button" className="btn btn-danger" value={i} onClick={this.removeItemHandler.bind(this)}>
                                      <i className="fas fa-trash-alt"></i> Remove
                                    </button></td>
                                </tr>
                              );
                          })}
                      <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-right"  background="white"><h5>Subtotal</h5></td>
                          <td className="text-right"><h5><strong>$24.59</strong></h5></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td className="text-right"><h5>Estimated shipping</h5></td>
                          <td className="text-right"><h5><strong>$6.94</strong></h5></td>
                      </tr>
                      <tr>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td>   </td>
                          <td className="text-right"><h3>Total</h3></td>
                          <td className="text-right"><h3><strong>$31.53</strong></h3></td>
                      </tr>
                      <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="text-right">
                            <button className="btn btn-default" onClick={this.continueShopping.bind(this)}>Continue Shopping <i className="fas fa-shopping-cart"></i></button>
                          </td>
                          <td className="text-right">
                            <button className="btn btn-success" onClick={this.checkOutHandler.bind(this)}>Checkout  <i className="fas fa-play"></i></button>
                          </td>
                      </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

          </div>
      </div>
      );
    }else {
      return (
        <div className="container text-center">
          <h1>Your Cart is empty.</h1>
          <button className="btn btn-default" onClick={this.continueShopping.bind(this)}>Continue Shopping <i className="fas fa-shopping-cart"></i></button>
        </div>
      )
    }
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapItemsToCart(context)
  };
};

export default withRouter(
  subscribe(ProviderContext, mapContextToProps)( ShoppingCart )
);
