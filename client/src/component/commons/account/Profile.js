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

  componentToggler(e){
    e.preventDefault();
    this.setState({ component : e.target.value })
  }

  render() {
    return (
      <div>
        <div className="customer-panel">
         <div className="list-group" >
            <a href="#" className="list-group-item" value="bookmarks" onClick={this.componentToggler.bind(this)}> <span>My bookmarked Items</span></a>
            <a href="#" className="list-group-item" value="orders" onClick={this.componentToggler.bind(this)}><span>All orders</span></a>
            <a href="#" className="list-group-item" value="account" onClick={this.componentToggler.bind(this)}><span>Account manage</span></a>
         </div>
          <div>
            <div className="customer-panel-content">
              <Account/>
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
