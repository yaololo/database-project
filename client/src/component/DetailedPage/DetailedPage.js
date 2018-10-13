import React, { Component } from 'react';
import './DetailedPage.css'

class DetailedPage extends Component {
  render() {
    return (
    <div class="container">
      <div class="card">
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="tab-content">
                <img src={this.props.location.state.key.image} />
              </div>
            </div>
            <div class="details col-md-6">
              <h3 class="product-title">{this.props.location.state.key.p_name}</h3>
              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
                <span class="review-no"></span>
              </div>
              <p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
              <p class="product-description">Suspendisse quos? Tempus cras iure temporibuctus posuere.</p>
              <h4 class="price">current price: <span>${this.props.location.state.key.unit_price}</span></h4>
              <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
              <h5></h5>
              {/* <h5 class="sizes">sizes:
                <span class="size" data-toggle="tooltip" title="small">s</span>
                <span class="size" data-toggle="tooltip" title="medium">m</span>
                <span class="size" data-toggle="tooltip" title="large">l</span>
                <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
              </h5> */}
              <h5 class="colors">colors:
                <span class="color orange" data-toggle="tooltip" title="Not In store"></span>
                <span class="color green"></span>
                <span class="color blue"></span>
              </h5>

              <div class="action">
                <button class="add-to-cart btn btn-default" type="button">add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default DetailedPage;
