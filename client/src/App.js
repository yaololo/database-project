import Login from './component/commons/account/Login';
import SignUp from "./component/commons/account/SignUp";
import './App.css';
import Header from './component/commons/Header/Header';
import Footer from './component/commons/Footer/Footer'
import NotFound from './component/commons/404NotFound/NotFound';
import Home from './component/commons/Home/Home';
import DetailedPage from './component/DetailedPage/DetailedPage';
import ShoppingCart from './component/ShoppingCart/ShoppingCart';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-contextual";
import React, { Component } from 'react';
import { CookiesProvider } from "react-cookie";
class App extends Component {
  isAuthenticated = false;

  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  saveSession = (jwtToken, user) => {
    this.isAuthenticated = true;
    return { jwtToken, user };
  };

  clearSession = () => {
    this.isAuthenticated = false;
    return { jwtToken: null, user: {} };
  };

  updateCartProductList = (productList) => {
    return { cartProductList: productList}
  }

  store = {
    initialState: { jwtToken: null, user: {}, messages: {} , cartProductList: [], noItems: 0 },
    actions: {
      saveSession: this.saveSession,
      clearSession: this.clearSession,
      // updateItemsQty: this.updateItemsQty,
      updateCartProductList: this.updateCartProductList,
      clearMessages: () => ({ messages: {} }),
      setErrorMessages: errors => ({ messages: { error: errors } }),
      setSuccessMessages: success => ({ messages: { success: success } }),
      setInfoMessages: info => ({ messages: { info: info } })
    }
  };

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
    return (
      <Provider {...this.store}>
        <CookiesProvider>
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route path="/" exact render={() => <Home data={this.state.data} />} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component= {SignUp} />
                <Route path="/my_cart" exact render={() => <ShoppingCart data={this.state.data} />} />
                <Route path="/product/:productId" exact component={DetailedPage} />
                {/* <this.PrivateRoute path="/my_cart" component={ShoppingCart} /> */}
                <Route path="*" component={NotFound} />
              </Switch>
              <div>
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    );
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
         this.setErrorMessages(json.msg)
        );
      }
    });
  }
}

export default App;