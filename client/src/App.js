import React, { Component } from 'react';
import Login from './component/shared/Commons/Login';
import SignUp from "./component/shared/Commons/SignUp";
import './App.css';
import Header from './component/shared/Header/Header';
import Footer from './component/shared/Footer/Footer'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './component/shared/404NotFound/NotFound';
import Home from './component/shared/Home/Home';


class App extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      isGoodResponse: true
    };
    this.data1 = [];
    this.notFetchedData = true;
  }

  componentWillMount() {
    fetch('/hotItems', {
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

  render() {
    return (
      <div className="big_wrapper">
        <BrowserRouter>
        <div>
           <Header />
          <Switch>
            <Route path="/" exact render={() => <Home data={this.state.data} />} />
            <Route path="/login" exact component={Login} />

            <Route path="/signup" exact component={SignUp} />
            {/* <PrivateRoute path="/account" component={Profile} /> */}
            {/* <Route path="/forgot" component={Forgot} /> */}
            {/* <Route path="/reset/:token" component={Reset} /> */}
            <Route path= '*' component={NotFound} />
          </Switch>
          </div>
        </BrowserRouter>
        {/* <Home data={this.props.data} />  */}
        <Footer/>
      </div>
    );
  }
}

export default App;
