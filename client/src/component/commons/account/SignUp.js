import React from "react";
import { Link } from "react-router-dom";
import { signup } from "../Auth/Auth";
import { object, instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { ProviderContext, subscribe } from "react-contextual";
import {
  mapSessionContextToProps,
  sessionContextPropType,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../../context_helper"
import Messages from '../../Message/Message';

class SignUp extends React.Component {
  static propTypes = {
    history: object.isRequired,
    cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType,
    ...messageContextPropType
  };

  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", email: "", password: "", gender: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    console.log('clicked')
    signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      email: this.state.email,
      password: this.state.password,
      history: this.props.history,
      cookies: this.props.cookies,
      sessionContext: this.props.sessionContext,
      messageContext: this.props.messageContext,
    });
  }

  componentWillUnmount() {
    this.props.messageContext.clearMessages();
  }

  render() {
    return (
      <div className="login-container container">
        <div className="panel">
          <div className="panel-body">
          <Messages messages={this.props.messageContext.messages} />
            <form onSubmit={this.handleSignup.bind(this)}>
              <legend>Create an account</legend>
              <div className="form-group">
                <h4 htmlFor="name">First Name</h4>
                <input
                  type="text"
                  name="firstName"
                  id="first-name"
                  placeholder="Name"
                  autoFocus
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <h4 htmlFor="name">Last Name</h4>
                <input
                  type="text"
                  name="lastName"
                  id="last-name"
                  placeholder="Name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <h4 htmlFor="email">Email</h4>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  id="email"
                  placeholder="Email"
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
                <span>
                  <label className="gender-label">Male
                    <input
                      type="radio"
                      name="gender"
                      value= "M"
                      checked="checked"
                      onChange={this.handleChange.bind(this)}
                    />
                  </label>
                </span>
                <span>
                  <label className="gender-label">Female
                    <input
                      type="radio"
                      name="gender"
                      value= "F"
                      onChange={this.handleChange.bind(this)}
                    />
                  </label>
                </span>
              </div>
              <div className="form-group">
                <small className="text-muted">
                  By signing up, you agree to the{" "}
                  <Link to="/">Terms of Service</Link>.
                </small>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                data-cy="signUp-submit"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login">
            <strong>Log in</strong>
          </Link>
        </p>
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
  withCookies(SignUp)
);
