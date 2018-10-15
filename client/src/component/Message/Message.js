import React from "react";
import { object } from "prop-types";

class Messages extends React.Component {
  static propTypes = {
    messages: object.isRequired
  };

  render() {
    if(this.props.messages !== undefined){
      return this.props.messages.success ? (
        <div role="alert" className="alert alert-success" data-cy="success">
            <div >{this.props.messages.success}</div>
        </div>
      ) : this.props.messages.error ? (
        <div role="alert" className="alert alert-danger" data-cy="error">
            <div >{this.props.messages.error}</div>
        </div>
      ) : this.props.messages.info ? (
        <div role="alert" className="alert alert-info" data-cy="info">
            <div >{this.props.messages.msg}</div>
        </div>
      ) : null;
    }else {
      return null
    }
  }
}

export default Messages;
