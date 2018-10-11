import { Link } from "react-router-dom";
import { login } from "../Auth/Auth";

import { withCookies, Cookies } from "react-cookie";
import React, { Component } from 'react';
import { object, instanceOf } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType
} from "../../../context_helper";

class Login extends Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType
  };

  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getRedirectReferer() {
    let locationState = this.props.location.state;
    if (locationState && locationState.from) {
      return locationState.from.pathname;
    } else {
      return "/";
    }
  }

  handleLogin(event) {
    event.preventDefault();
    login({
      email: this.state.email,
      password: this.state.password,
      history: this.props.history,
      cookies: this.props.cookies,
      from: this.getRedirectReferer(),
      sessionContext: this.props.sessionContext
    });
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <form onSubmit={this.handleLogin.bind(this)}>
              <legend>Log In</legend>
              <div className="form-group">
                <h4 htmlFor="email">Email</h4>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="email"
                  placeholder="Email"
                  autoFocus
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <h4 htmlFor="password">Password</h4>
                <input
                  type="password"
                  name="password"
                  autoComplete="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <Link to="/forgot" data-cy="forgot-password">
                  <h5>Forgot your password?</h5>
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                data-cy="login-submit"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup" data-cy="sign-up">
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    );
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withCookies(Login)
);
