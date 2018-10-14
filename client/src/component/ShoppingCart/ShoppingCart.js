import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor(props){
    super(props);
    this.state={ data: [] }
    this.isUpdated = false;
  }
  componentWillReceiveProps(nextProps) {
      this.setState({data: nextProps.data});
  }

  componentDidMount(){
    this.setState({data: this.props.data});
    this.isUpdated = true
  }

  removeItemHandler(event){
    event.preventDefault();
    this.state.data.splice(event.target.value, 1); 
    let newState = this.state.data;
    this.setState({data: newState});
  }

  render() {
    if( this.isUpdated === true ){
      // this.state.data.length === 0?
      return (
        <div className="container cart-card">
          <div className="row">
              <div className="col-10">
                  <div className="table-responsive">
                      <table className="table table-striped">
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
                          {this.state.data.slice(0, 10).map((element, i) => {
                            return (
                                <tr key={i}>
                                    <td width="120"><img src={element.image.split(',')[0]} alt=""/> </td>
                                    <td>{element.p_name}</td>
                                    <td>In stock</td>
                                    <td><input className="form-control" type="text" value="1" /></td>
                                    <td className="text-right">{`$${element.unit_price}`}</td>
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
                            <td></td>
                            <td></td>
                          </tr>
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
                          </tbody>
                      </table>
                  </div>
                <div className="col mb-2">
                    <div className="row">
                        <div className="col-sm-12  col-md-6">
                            <button className="btn btn-block btn-light">Continue Shopping</button>
                        </div>
                        <div className="col-sm-12 col-md-6 text-right">
                            <button className="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                        </div>
                    </div>
                </div>
              </div>
              
          </div>
      </div>
      );
    }else {
      return (
        <div>not ready</div>
      )
    }
  }
}

export default ShoppingCart;
