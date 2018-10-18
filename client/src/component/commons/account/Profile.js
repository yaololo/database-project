import React, { Component } from 'react';
import './Profile.css'
class Profile extends Component {
  render() {
    return (
      <div>
        <div class="side-menu">
          <nav class="navbar navbar-default" role="navigation">
            <div class="side-menu-container">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-plane"></span> Active Link</a></li>
                <li><a href="#"><span class="glyphicon glyphicon-cloud"></span> Link</a></li>

                <li class="panel panel-default" id="dropdown">
                  <a data-toggle="collapse" href="#dropdown-lvl1">
                    <span class="glyphicon glyphicon-user"></span> Sub Level <span class="caret"></span>
                  </a>

                  <div id="dropdown-lvl1" class="panel-collapse collapse">
                    <div class="panel-body">
                      <ul class="nav navbar-nav">
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>
                        <li><a href="#">Link</a></li>

                      
                        <li class="panel panel-default" id="dropdown">
                          <a data-toggle="collapse" href="#dropdown-lvl2">
                            <span class="glyphicon glyphicon-off"></span> Sub Level <span class="caret"></span>
                          </a>
                          <div id="dropdown-lvl2" class="panel-collapse collapse">
                            <div class="panel-body">
                              <ul class="nav navbar-nav">
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                                <li><a href="#">Link</a></li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li><a href="#"><span class="glyphicon glyphicon-signal"></span> Link</a></li>

              </ul>
            </div>
          </nav>
        </div>
  		  <div class="col-md-10 content">
          <div class="panel panel-default">
            <div class="panel-heading">
              Dashboard
            </div>
            <div class="panel-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
          </div>
        </div>  		
      </div>
    );
  }
}

export default Profile;
