import React, { Component } from 'react';
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../context_helper"

class Admin extends Component {

  static propTypes = {
    ...sessionContextPropType,
    ...messageContextPropType
  };

  constructor(){
    super()
    this.state= {
      component: '',
    }
  }

  componentToggler(event){
    event.preventDefault();
    this.setState({ component : event.target.value })
  }

  render() {
    return (
      <div>
        <div className="customer-panel">
         <div className="list-group" >
            <a className="list-group-item" name="bookmarks" onClick={this.componentToggler.bind(this)}> Sales</a>
            <a className="list-group-item" name="orders" onClick={this.componentToggler.bind(this)}>User Activities</a>
            <a className="list-group-item" name="account" onClick={this.componentToggler.bind(this)}>Items Sold</a>
         </div>
          <div>
            <div className="customer-panel-content">
              something
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  Admin
);
