import React, { Component } from 'react';
import LayoutTemplate from '../LayoutTemplate/LayoutTemplate'
class SearchView extends Component {

  render() {
    return (
      <div>
        <LayoutTemplate data={this.props.location.state.data} />
      </div>
    );
  }
}

export default SearchView;
