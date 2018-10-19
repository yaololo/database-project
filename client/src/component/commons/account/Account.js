import React from "react";
import { ProviderContext, subscribe } from "react-contextual";


class Account extends React.Component {
  static propTypes = {

    // ...messageContextPropType,
    // ...sessionContextPropType
  };

  constructor(props) {
    super(props);
    this.state = {
      // email: props.sessionContext.user.email,
      // name: props.sessionContext.user.name,
      // gravatar: props.sessionContext.user.gravatar,
      // password: "",
      // confirm: ""
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return {
  //     email: nextProps.sessionContext.user.email,
  //     name: nextProps.sessionContext.user.name,
  //     gravatar: nextProps.sessionContext.user.gravatar
  //   };
  // }

  // componentWillUnmount() {
  //   this.props.messageContext.clearMessages();
  // }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    // updateProfile({
    //   state: this.state,
    //   sessionContext: this.props.sessionContext,
    //   messageContext: this.props.messageContext
    // });
  }

  handleChangePassword(event) {
    event.preventDefault();
    // changePassword({
    //   password: this.state.password,
    //   confirm: this.state.confirm,
    //   sessionContext: this.props.sessionContext,
    //   messageContext: this.props.messageContext
    // });
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    // deleteAccount({
    //   history: this.props.history,
    //   cookies: this.props.cookies,
    //   sessionContext: this.props.sessionContext,
    //   messageContext: this.props.messageContext
    // });
  }

  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-body">
            {/* <Messages messages={this.props.messageContext.messages} /> */}
            <form
              // onSubmit={this.handleProfileUpdate.bind(this)}
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
                    // onChange={this.handleChange.bind(this)}
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
                    // onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="form-group">
                <h4 className="col-sm-3">Gravatar</h4>
                <div className="col-sm-4">
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
              // onSubmit={this.handleChangePassword.bind(this)}
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
                    // onChange={this.handleChange.bind(this)}
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
                    // onChange={this.handleChange.bind(this)}
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
              // onSubmit={this.handleDeleteAccount.bind(this)}
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

// const mapContextToProps = context => {
//   return {
//     ...mapSessionContextToProps(context),
//     ...mapMessageContextToProps(context)
//   };
// };

export default subscribe(ProviderContext)(
  Account
);
