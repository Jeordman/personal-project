import React, { Component } from "react";
import { connect } from "react-redux";
import { checkIfRequested } from "../../ducks/requestCounselorReducer";
import RequestInboxRepeating from "../RequestInboxRepeating/RequestInboxRepeating";
import "./requestInbox.css";

class RequestInbox extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  componentDidMount = () => {
    if (this.props.loggedInCounselor) {
      this.props.checkIfRequested(this.props.loggedInCounselor.id);
    }
  };

  render() {
    console.log("props", this.props);
    if (this.props.requestedUsers[0]) {
      if (this.state.showMenu) {
        return (
          <div className="inbox-full-box">
            <section className="repeating-requests">
              {this.props.requestedUsers.map(obj => {
                return (
                  <div>
                    <RequestInboxRepeating
                      obj={obj}
                      key={this.props.requestedUsers.user_counselor_id}
                    />
                  </div>
                );
              })}
            </section>
            <button
              onClick={this.toggleMenu}
              className="notification-requests-back"
            >{`< Back`}</button>
          </div>
        );
      } else {
        return (
          <button
            onClick={this.toggleMenu}
            className="notification-requests"
          >{`${this.props.requestedUsers.length} New  >`}</button>
        );
      }
    } else {
      return null;
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
