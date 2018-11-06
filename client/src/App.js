
import './App.css';


import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-contextual";
import React, { Component } from 'react';
import { CookiesProvider } from "react-cookie";
import MyApp from './MyApp';
class App extends Component {

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

  updateCartProductInfoList = (productInfoList) => {
    return { cartProductInfoList: productInfoList }
  }

  updateNoOfItemInCart = (noOfItems) => {
    return { noOfItems: noOfItems }
  }

  store = {
    initialState: { jwtToken: null, user: {}, messages: {} , cartProductList: [], noOfItems: 0 , cartProductInfoList: [] },
    actions: {
      saveSession: this.saveSession,
      clearSession: this.clearSession,
      updateItemsQty: this.updateItemsQty,
      updateCartProductList: this.updateCartProductList,
      updateNoOfItemInCart: this.updateNoOfItemInCart,
      updateCartProductInfoList: this.updateCartProductInfoList,
      clearMessages: () => ({ messages: {} }),
      setErrorMessages: errors => ({ messages: { error: errors } }),
      setSuccessMessages: success => ({ messages: { success: success } }),
      setInfoMessages: info => ({ messages: { info: info } })
    }
  };

  render() {
    return (
      <Provider {...this.store}>
        <CookiesProvider>
          <BrowserRouter>
            <MyApp/>
          </BrowserRouter>
        </CookiesProvider>
      </Provider>
    )
  }
}


export default App;
