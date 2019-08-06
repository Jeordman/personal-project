import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getRequestedUsers,
  rejectRequest,
  acceptRequest,
  getAcceptedUsers
} from "../../ducks/requestCounselorReducer";
import { thisExpression } from "@babel/types";
import './requestInboxRepeating.css'

class RequestInboxRepeating extends Component {
  constructor() {
    super();
  }

  acceptRequest = (user_counselor_id, counselor_id) => {
    this.props.acceptRequest(user_counselor_id, counselor_id);
    this.props.getAcceptedUsers(user_counselor_id, counselor_id);
  };

  render() {
    console.log(
      this.props.obj.user_counselor_id,
      this.props.obj.counselor_id,
      this.props.rejectRequest
    );
    return (
      <div className='full-request-repeat'>
        <section>{`${this.props.obj.first_name} ${
          this.props.obj.last_name
        }`}</section>
        <div className='all-accept-request-buttons'>
        <button
          onClick={() =>
            this.acceptRequest(
              this.props.obj.user_counselor_id,
              this.props.obj.counselor_id
            )
          }
        >
          Accept
        </button>
        <button
          onClick={() =>
            this.props.rejectRequest(
              this.props.obj.user_counselor_id,
              this.props.obj.counselor_id
            )
          }
        >
          Deny
        </button>
        </div>
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
  { getRequestedUsers, rejectRequest, acceptRequest, getAcceptedUsers }
)(RequestInboxRepeating);
