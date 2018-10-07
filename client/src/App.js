import React, { Component } from 'react';
import './App.css';
import Header from './component/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Menu from './component/shared/Menu/Menu';
// import Home from './component/shared/Home/Home';

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
    // console.log(this.data);
    return (
      <div>
        <div className="big_wrapper">
          <div>
            <BrowserRouter>
              <Menu data={[this.state.data, this.state.isGoodResponse]} />
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
