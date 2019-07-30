import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfRequested } from "../../ducks/requestCounselorReducer";

class RequestInbox extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.loggedInCounselor) {
      this.props.checkIfRequested(this.props.loggedInCounselor.id);
    }
  };

  render() {
    return <div>Grabbing Requests</div>;
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    requestedUsers: state.requestedUsers,
    loggedInCounselor: state.counselors.user
  };
}

export default connect(
  mapStateToProps,
  { checkIfRequested }
)(RequestInbox);
