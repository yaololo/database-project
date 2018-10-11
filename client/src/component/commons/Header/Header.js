import React from "react";
import { NavLink } from "react-router-dom";
class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    const active = { borderBottomColor: "#3f51b5" };

    const rightNav =
     this.props.logInStatus ? (
      <div>
        <ul className="nav navbar-nav navbar-left">
          <li>
            <NavLink exact to="/" activeStyle={active}>
              My Dashboard
            </NavLink>
          </li>
        </ul>
          Logged In
      </div>
    ) :
     (<ul className="nav navbar-nav navbar-right">
        <li>
          <NavLink to="/login" activeStyle={active}>
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" activeStyle={active}>
            Sign up
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              className="navbar-toggle collapsed"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <NavLink exact to="/" className="navbar-brand">
              Project name
            </NavLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink exact to="/" activeStyle={active}>
                  Home
                </NavLink>
              </li>
            </ul>
            {rightNav}
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
