import { Link } from "react-router-dom";
import { login } from "../Auth/Auth";
import { object } from "prop-types";

import React, { Component } from 'react';

class Login extends Component {
  static propTypes = {
    history: object.isRequired,
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
      from: this.getRedirectReferer(),
    });
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
            <form >
              <legend>Log In</legend>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  autoFocus
                  className="form-control"
                  value={this.state.email}
                  autoComplete="email"
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  autoComplete="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <button type="submit" className="btn btn-success">
                Log in
              </button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/signup">
            <strong>Sign up</strong>
          </Link>
        </p>
     </div>
    );
  }
}
export default Login;
