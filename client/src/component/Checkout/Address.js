import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Address.css'

class Address extends Component {

  constructor(props) {
    super(props);
    this.state = { country: "", city: "", street: "", postcode: "", contact: "", receiver: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  proceedHandler(event) {
    event.preventDefault();
    let address = {
      country: this.state.country,
      city: this.state.city,
      street: this.state.street,
      postcode: this.state.postcode,
      contact: this.state.contact,
      receiver: this.state.receiver
    }

    this.props.history.push({
      pathname:`/checkout/confirm_checkout`,
      state:{
          productInfoList: this.props.location.state.productInfoList,
          userInfo: this.props.location.state.userInfo,
          addressInfo: address
       }
     });
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
          {/* <Messages messages={this.props.messageContext.messages} /> */}
            <form onSubmit={this.proceedHandler.bind(this)}>
              <legend>Address</legend>
              <div className="form-group address-country-city-input">
                <div className="address-country">
                  <h4 htmlFor="name">Country</h4>
                  <input
                    type="text"
                    name="country"
                    id="address-Country"
                    placeholder="Country"
                    autoFocus
                    className="form-control "
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className="address-city">
                  <h4 htmlFor="name">City</h4>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      autoFocus
                      className="form-control address-city"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this)}
                    />
                </div>
              </div>
              <div className="form-group">
                <h4 htmlFor="name">Street Name</h4>
                <textarea
                  type="text"
                  rows='3'
                  name="street"
                  placeholder="Street"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group address-postcode-input">
                <div>
                  <h4 htmlFor="name">Postcode</h4>
                  <input
                    type="text"
                    name="postCode"
                    placeholder="Postcode"
                    autoFocus
                    className="form-control "
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div></div>
                <div></div>
              </div>
              <div className="form-group address-contact-receiver-input">
                <div className="address-country">
                  <h4 htmlFor="name">Receiver</h4>
                  <input
                    type="text"
                    name="receiver"
                    placeholder="Receiver"
                    autoFocus
                    className="form-control "
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <div className="address-city">
                  <h4 htmlFor="name">Contact</h4>
                    <input
                      type="text"
                      name="city"
                      placeholder="Contact"
                      autoFocus
                      className="form-control address-city"
                      value={this.state.name}
                      onChange={this.handleChange.bind(this)}
                    />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                data-cy="signUp-submit"
              >
                Proceed
              </button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login">
            <strong>Log in</strong>
          </Link>
        </p>
      </div>
    );
  }
}

export default Address

// const mapContextToProps = context => {
//   return {
//     ...mapSessionContextToProps(context),
//     ...mapMessageContextToProps(context)
//   };
// };

// export default subscribe(ProviderContext, mapContextToProps)(
//   withCookies(SignUp)
// );
