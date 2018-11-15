import React, { Component } from 'react';
import './Profile.css'
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../../context_helper"
import ProfileContent from './ProfileContent';
class Profile extends Component {

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
    this.setState({ component : event.target.name })
  }

  render() {
    return (
      <div>
        <div className="customer-panel">
         <div className="list-group" >
            <a className="list-group-item" name="bookmarks" onClick={this.componentToggler.bind(this)}> My bookmarked Items</a>
            <a className="list-group-item" name="orders" onClick={this.componentToggler.bind(this)}>All orders</a>
            <a className="list-group-item" name="account" onClick={this.componentToggler.bind(this)}>Account manage</a>
         </div>
          <div>
            <div className="customer-panel-content">
              <ProfileContent component={this.state.component} />
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
  Profile
);
