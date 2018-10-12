import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router";
import { object, instanceOf } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType
} from "../../../context_helper";


class Header extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType
  };

  render() {
    const active = { borderBottomColor: "#3f51b5" };
    const loginNav = this.props.sessionContext.token ? (
      <div>
        <ul className="nav navbar-nav navbar-left">
          <li>
            <NavLink exact to="/" activeStyle={active}>
              My Dashboard
            </NavLink>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
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
                <Link to="/">My Account</Link>
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
              <em></em>Online Store
            </NavLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            {loginNav}
          </div>
        </div>
      </nav>
    );
  }
}

const mapContextToProps = context => {
  return mapSessionContextToProps(context);
};

export default withRouter(
  subscribe(ProviderContext, mapContextToProps)(withCookies(Header))
);







// class Header extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   render() {
//     const active = { borderBottomColor: "#3f51b5" };

//     const rightNav = this.props.sessionContext.token ? (
//       <div>
//         <ul className="nav navbar-nav navbar-left">
//           <li>
//             <NavLink exact to="/mydashboard" activeStyle={active}>
//               My Dashboard
//             </NavLink>
//           </li>
//         </ul>
//         <ul className="nav navbar-nav navbar-right">
//           <li className="dropdown" data-cy="profile">
//             <a
//               href="about:blank"
//               data-toggle="dropdown"
//               className="navbar-avatar dropdown-toggle"
//             >
//               <img
//                 alt="avatar"
//                 src={
//                   this.props.sessionContext.user.picture ||
//                   this.props.sessionContext.user.gravatar
//                 }
//               />
//               {this.props.sessionContext.user.name ||
//                 this.props.sessionContext.user.email ||
//                 this.props.sessionContext.user.id}
//               <i className="caret" />
//             </a>
//             <ul className="dropdown-menu">
//               <li>
//                 <Link to="/account">My Account</Link>
//               </li>
//               <li className="divider" />
//               <li>
//                 <a href="about:blank" onClick={this.handleLogout.bind(this)}>
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     ) : (
//     <ul className="nav navbar-nav navbar-right">
//         <li>
//           <NavLink to="/login" activeStyle={active}>
//             Log in
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/signup" activeStyle={active}>
//             Sign up
//           </NavLink>
//         </li>
//       </ul>
//     );
//     return (
//       <nav className="navbar navbar-default navbar-static-top">
//         <div className="container">
//           <div className="navbar-header">
//             <button
//               type="button"
//               data-toggle="collapse"
//               data-target="#navbar"
//               className="navbar-toggle collapsed"
//             >
//               <span className="sr-only">Toggle navigation</span>
//               <span className="icon-bar" />
//               <span className="icon-bar" />
//               <span className="icon-bar" />
//             </button>
//             <NavLink exact to="/" className="navbar-brand">
//               Project name
//             </NavLink>
//           </div>
//           <div id="navbar" className="navbar-collapse collapse">
//             <ul className="nav navbar-nav">
//               <li>
//                 <NavLink exact to="/" activeStyle={active}>
//                   Home
//                 </NavLink>
//               </li>
//             </ul>
//             {rightNav}
//           </div>
//         </div>
//       </nav>
//     );
//   }
// }

// export default Header;
