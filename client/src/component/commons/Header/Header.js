import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router";
import { object, instanceOf } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";
import { mapSessionContextToProps, sessionContextPropType, sessionCartInfoPropType, mapItemsToCart } from "../../../context_helper";
// import SideBar from '../../SideBar/SideBar';
import SideBar from '../../SideBar/SideBar';

class Header extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType,
    ...sessionCartInfoPropType
  };

  render() {
    const active = { borderBottomColor: "#3f51b5" };
    const loginNav = this.props.sessionContext.token ? (
      <div>
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item">
            <Link to="/my_cart" >
                <i className="fas fa-shopping-cart">
                  <span className="badge badge-danger">{this.props.sessionCartInfo.noOfItems}</span>
                </i>
            </Link>
            </li>
          <li className="dropdown" data-cy="profile">
            <a
              href="about:blank"
              data-toggle="dropdown"
              className="navbar-avatar dropdown-toggle"
            >
              {this.props.sessionContext.user.firstName}
              <i className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link to="/account">My Account</Link>
              </li>
              <li className="divider" />
              <li>
                <a href="/">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    ) : (
      <ul className="nav navbar-nav navbar-right">
        <li data-cy="login">
          <NavLink to="/login" activeStyle={active}>
            Log in
          </NavLink>
        </li>
        <li data-cy="signup">
          <NavLink to="/signup" activeStyle={active}>
            Sign up
          </NavLink>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container">
          <div className="nav-bar-div">
          <div className="navbar-header">
            <NavLink exact to="/" className="navbar-brand">
              <em></em>Online Store
            </NavLink>
          </div>
          <div className="search-bar">
              <SideBar/>
          </div>
          <div></div>
          <div id="navbar" className="navbar-collapse collapse">
            {loginNav}
          </div>
        </div>
        </div>
      </nav>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapItemsToCart(context)
  };
};

export default withRouter(
  subscribe(ProviderContext, mapContextToProps)( withCookies(Header))
);
