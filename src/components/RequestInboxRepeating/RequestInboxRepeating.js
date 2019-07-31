import React, { Component } from "react";
import { connect } from "react-redux";
import { getRequestedUsers } from "../../ducks/requestCounselorReducer";

class RequestInboxRepeating extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.userInfoArr) {
      this.props.getRequestedUsers(this.props.obj.counselor_id);
    }
  };

  render() {
    this.componentDidMount()
    console.log(this.props)
    if (this.props.userInfoArr[0]) {
      return (
        <div>
          <section>{this.props.userInfoArr[0].first_name}</section>
        </div>
      );
    }
    else {
     return <div>loading</div>
    }
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
