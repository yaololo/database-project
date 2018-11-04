import React, { Component } from 'react';
import Header from './component/commons/Header/Header';
import Footer from './component/commons/Footer/Footer'
import NotFound from './component/commons/404NotFound/NotFound';
import Home from './component/commons/Home/Home';
import DetailedPage from './component/DetailedPage/DetailedPage';
import ShoppingCart from './component/ShoppingCart/ShoppingCart';
import Profile from './component/commons/account/Profile'
import Address from './component/Checkout/Address';
import CheckOutConfirmation from './component/Checkout/CheckOutConfirmation';
import Login from './component/commons/account/Login';
import SignUp from "./component/commons/account/SignUp";

import { Route, Switch, Redirect } from "react-router-dom";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  sessionCartInfoPropType,
  mapItemsToCart,
  mapMessageContextToProps,
  messageContextPropType,
} from "./context_helper"
import { ProviderContext, subscribe } from "react-contextual";

import Admin from './component/Admin/Admin'

class MyApp extends Component {
  static propTypes = {
    // history: object.isRequired,
    // cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType,
    ...sessionCartInfoPropType,
    ...messageContextPropType
  };
  isAuthenticated = false;

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch('/api/hot_items', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            data: json.data
          });
        });
      } else {
        response.json().then(json =>
          console.log('app crash')
        );
      }
    });
  }

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        this.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  render() {
    return this.props.sessionContext.user.userType !== 'admin' ?(
      <div>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <Home data={this.state.data} />} />
          <Route path="/confirm_checkout" exact component= {CheckOutConfirmation} />
          <this.PrivateRoute path="/account" component={Profile} />
          <this.PrivateRoute path="/checkout/address" component={Address} />
          <this.PrivateRoute path="/checkout/confirm_checkout" component={CheckOutConfirmation} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component= {SignUp} />
          <Route path="/product/:productId" exact component={DetailedPage} />
          <this.PrivateRoute path="/my_cart" exact component={ShoppingCart} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    ): (
      <Admin/>
    )
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
  MyApp
);
