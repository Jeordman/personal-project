import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequestedUsers } from "../../ducks/requestCounselorReducer";
import { thisExpression } from "@babel/types";

class RequestInboxRepeating extends Component {
  constructor() {
    super();

    
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <section>{`${this.props.obj.first_name} ${this.props.obj.last_name}`}</section>
        <button>Accept</button>
        <button>Deny</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfoArr: state.requestCounselor.userRequests
  };
}

export default connect(
  mapStateToProps,
  { getRequestedUsers }
)(RequestInboxRepeating);
