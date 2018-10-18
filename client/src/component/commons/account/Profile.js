import React, { Component } from 'react';
import './Profile.css'
class Profile extends Component {
  render() {
    return (
      <div>
        <div className="customer-panel">
         <div className="list-group" >
            <a href="#" class="list-group-item active"><i class="fa fa-key"></i> <span>App Settings</span></a>
            <a href="#" class="list-group-item"><i class="fa fa-credit-card"></i> <span>Billing</span></a>
            <a href="#" class="list-group-item"><i class="fa fa-question-circle"></i> <span>Support</span></a>
            <a href="#" class="list-group-item"><i class="fa fa-arrow-circle-o-left"></i> <span>Sandbox Account</span></a>
            <a href="#" class="list-group-item"><i class="fa fa-book"></i> <span>QuickStart Overview</span></a>
            <a href="#" class="list-group-item"><i class="fa fa-compass"></i> <span>Documentation</span></a>
          </div>
          <div className="customer-panel-content">
            <div>
              <h1>hello</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
