import Login from './component/commons/account/Login';
import SignUp from "./component/commons/account/SignUp";
import Profile from "./component/commons/account/SignUp"
import './App.css';
import Header from './component/commons/Header/Header';
import Footer from './component/commons/Footer/Footer'
import NotFound from './component/commons/404NotFound/NotFound';
import Home from './component/commons/Home/Home';

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

  store = {
    initialState: { jwtToken: null, user: {}, messages: {} },
    actions: {
      saveSession: this.saveSession,
      clearSession: this.clearSession,
      updateUserProfile: newProfile => state => ({
        user: Object.assign(state.user, newProfile)
      }),
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
                <this.PrivateRoute path="/account" component={Profile} />
                <this.PrivateRoute
                  path="/mydashboard"
                  component={Home}
                />
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
    fetch('/api/hotItems', {
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
        this.notFetchedData = false;
        response.json().then(json =>
          this.setState({
            data: json.data
          })
        );
      }
    });
  }
}

export default App;