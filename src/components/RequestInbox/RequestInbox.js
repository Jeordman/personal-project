import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfRequested } from "../../ducks/requestCounselorReducer";
import RequestInboxRepeating from "../RequestInboxRepeating/RequestInboxRepeating";
import "./requestInbox.css";

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
    console.log("props", this.props);
    if (this.props.requestedUsers[0]) {
      return (
        <div className="inbox-full-box">
          Here are your requests
          <section className="repeating-requests">
            {this.props.requestedUsers.map(obj => {
              return (
                <div>
                  <RequestInboxRepeating obj={obj} key={this.props.requestedUsers.user_counselor_id}/>
                </div>
              );
            })}
          </section>
        </div>
      );
    } else {
      return <div>NO REQUESTS FOUND</div>;
    }
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    requestedUsers: state.requestCounselor.requestedUsers,
    loggedInCounselor: state.counselors.user
  };
}

export default connect(
  mapStateToProps,
  { checkIfRequested }
)(RequestInbox);
