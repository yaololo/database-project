import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './Profile.css'
import BookMarkedItems from './BookMarkedItems';
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../../context_helper"
import Messages from '../../Message/Message';
import Account from './Account';
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
    this.setState({ component : event.target.value })
  }

  render() {
    return (
      <div>
        <div className="customer-panel">
         <div className="list-group" >
            <button className="list-group-item" value="bookmarks" onClick={this.componentToggler.bind(this)}> My bookmarked Items</button>
            <button className="list-group-item" value="orders" onClick={this.componentToggler.bind(this)}>All orders</button>
            <button className="list-group-item" value="account" onClick={this.componentToggler.bind(this)}>Account manage</button>
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
