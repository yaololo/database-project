import { object } from "prop-types";
import React, { Component } from 'react';

class NotFound extends Component {
  static propTypes = {
    history: object.isRequired
  };

  render() {
    return (
      <div className="container text-center">
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
    );
  }
}

export default NotFound;
