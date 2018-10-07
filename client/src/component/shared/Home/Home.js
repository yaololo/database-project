import React, { Component } from 'react';
import LayoutTemplate from '../../LayoutTemplate/LayoutTemplate';

class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      isGoodResponse: props.data
    };
  }
  render() {
    return (
      <div>
        <LayoutTemplate data={this.props.data} />
      </div>
    );
  }
}

export default Home;
