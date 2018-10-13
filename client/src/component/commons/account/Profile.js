import React from "react";

import { object, instanceOf } from "prop-types";
import { ProviderContext, subscribe } from "react-contextual";


class Profile extends React.Component {
  static propTypes = {
    history: object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.sessionContext.user.email,
      password: "",
      confirm: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      email: nextProps.sessionContext.user.email,
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            <form
              className="form-horizontal"
            >
              <legend>Profile Information</legend>
              <div className="form-group">
                <h4 htmlFor="email" className="col-sm-3">
                  Email
                </h4>
                <div className="col-sm-7">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <h4 htmlFor="name" className="col-sm-3">
                  Name
                </h4>
                <div className="col-sm-7">
                  <input
                    data-cy="profile-name"
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <h4 className="col-sm-3">Gravatar</h4>
                <div className="col-sm-4">
                  {/* <img
                    src={this.state.gravatar}
                    width="100"
                    height="100"
                    className="profile"
                    alt="avatar"
                  /> */}
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4">
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-cy="update-profile"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form
              className="form-horizontal"
            >
              <legend>Change Password</legend>
              <div className="form-group">
                <h4 htmlFor="password" className="col-sm-3">
                  New Password
                </h4>
                <div className="col-sm-7">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <h4 htmlFor="confirm" className="col-sm-3">
                  Confirm Password
                </h4>
                <div className="col-sm-7">
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    className="form-control"
                    value={this.state.confirm}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-3">
                  <button type="submit" className="btn btn-success">
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="panel">
          <div className="panel-body">
            <form
              className="form-horizontal"
            >
              <legend>Delete Account</legend>
              <div className="form-group">
                <p className="col-sm-offset-3 col-sm-9">
                  You can delete your account, but keep in mind this action is
                  irreversible.
                </p>
                <div className="col-sm-offset-3 col-sm-9">
                  <button type="submit" className="btn btn-danger">
                    Delete my account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default subscribe(ProviderContext)(
  Profile
);
