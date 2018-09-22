import React, { Component } from 'react';
import './App.css';
import Header from './component/shared/Header/Header';
import { BrowserRouter } from 'react-router-dom';
import Menu from './component/shared/Menu/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <div className="big_wrapper">
          <div className="container-fluid header">
            <Header />
          </div>
          <BrowserRouter>
            <Menu />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
