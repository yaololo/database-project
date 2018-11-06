import React, { Component } from 'react';
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../context_helper"
import AdminContent from './AdminContent';
import './Admin.css'
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
    this.setState({ component : event.target.name })
  }

  render() {
    return (
      <div>
        <div className="admin-panel">
         <div className="list-group" >
            <a className="list-group-item" name="sales-report" onClick={this.componentToggler.bind(this)}> Sales</a>
            <a className="list-group-item" name="active-user" onClick={this.componentToggler.bind(this)}>User Activities</a>
            <a className="list-group-item" name="product-sales" onClick={this.componentToggler.bind(this)}>Items Sold</a>
         </div>
          <div>
            <div className="customer-panel-content">
              <AdminContent component={this.state.component} />
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
