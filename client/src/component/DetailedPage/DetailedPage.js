import React, { Component } from 'react';
import './DetailedPage.css'
import { mapSessionContextToProps, sessionContextPropType } from "../../context_helper";
import { updateCart } from '../utils/utils';
import { ProviderContext, subscribe } from "react-contextual";

class DetailedPage extends Component {
  static propTypes = {
    ...sessionContextPropType
  };

  constructor(){
    super();
    this.state = { quantity: 1 }
  }

  onChangeHandler(event){
    event.preventDefault();
    console.log(event.target.value)
    this.setState({ quantity: event.target.value });
  }

  onClickHandler(event){
    updateCart(this.props.location.state.key.product_id, this.props.sessionContext.user.id, this.state.quantity);
  }



  render() {
    return (
    <div className="container">
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="tab-content">
                <img src={this.props.location.state.key.image} alt=""/>
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
                <span className="review-no"></span>
              </div>
              <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
              <p className="product-description">Suspendisse quos? Tempus cras iure temporibuctus posuere.</p>
              <h4 className="price">current price: <span>${this.props.location.state.key.unit_price}</span></h4>
              <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
              <div></div>
              {/* <h5 className="sizes">sizes:
                <span className="size" data-toggle="tooltip" title="small">s</span>
                <span className="size" data-toggle="tooltip" title="medium">m</span>
                <span className="size" data-toggle="tooltip" title="large">l</span>
                <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
              </h5> */}
              <h5 className="colors">colors:
                <span className="color orange" data-toggle="tooltip" title="Not In store"></span>
                <span className="color green"></span>
                <span className="color blue"></span>
              </h5>
              <div className="qty-counter">
                  <span>Quantity: </span>
                  <input type="number" name="quantity" min="1" maxLength="4" size="4" placeholder="1" onChange={this.onChangeHandler.bind(this)}/>
              </div>
              <div className="action">
                <button className="add-to-cart btn btn-default" type="button" onClick={this.onClickHandler.bind(this)}>add to cart</button>
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
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  DetailedPage
);