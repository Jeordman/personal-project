import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getCounselors } from "../../ducks/counselorsReducer";
import { getUsers } from "../../ducks/userReducer";
import {
  requestCounselor,
  sendText
} from "../../ducks/requestCounselorReducer";
import "./myCounselor.css";

class MyCounselor extends Component {
  constructor() {
    super();

    this.state = {
      toggle: false
    };
  }

  componentDidMount() {
    this.props.getCounselors();
    this.props.getUsers();
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  requestCounselor = () => {
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
    const thatCounselor = thisCounselor[0];
    this.props.requestCounselor(
      this.props.user.user.id,
      thatCounselor.counselor_id
    );
    this.props.sendText(
      this.props.user.user.first_name,
      this.props.user.user.last_name
    );
  };

  toggleState = () => {
    this.setState({ toggle: !this.state.toggle });
    this.requestCounselor();
  };

  render() {
    let { user, error, redirect } = this.props.user;
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
    console.log("this", thisCounselor);
    const thisUser = this.props.users.users.filter(
      id => id.user_id === +counselorId
    );
    //insert ternary
    const thatCounselor = thisCounselor[0];
    const thatUser = thisUser[0];
    if (error || redirect) return <Redirect to="/login" />;

    if (!thatCounselor && !thatUser) {
      if (this.props.user.user) return <Redirect to="/login" />;
      if (this.props.counselor) return <Redirect to="/login" />;
    }
    // if(this.props.user.user.loggedIn || this.props.counselor.loggedIn) return <Redirect to="/login" />

    if (this.props.counselors.counselor) {
      const { first_name, last_name, photo } = thatUser;
      return (
        <div>
          <Header />
          <div className="holder">
            {`${first_name} ${last_name}`}
            <img
              onError={this.addDefaultSrc}
              src={photo}
              className="profile-pic"
            />
          </div>
          <h2>BIO</h2>
          <div className="holder">
            <h3 className="bio">{thatUser.info}</h3>
          </div>
        </div>
      );
    }

    if (this.props.user.user) {
      const { first_name, last_name, photo } = thatCounselor;
      console.log("props", this.props);
      return (
        <div className="holder">
          <Header />
          <h1>
            {`${first_name} ${last_name}`}
            <img
              onError={this.addDefaultSrc}
              src={photo}
              className="profile-pic"
            />
          </h1>
          <h2>BIO</h2>
          <div>
            <h3 className="bio">{thatCounselor.info}</h3>
          </div>
          {this.state.toggle ? (
            <section>REQUEST SENT</section>
          ) : (
            <button
              className="request-counselor-button"
              onClick={() => this.toggleState()}
            >
              REQUEST COUNSELOR
            </button>
          )}
        </div>
      );
    } else
      return (
        <div className="loading-spin">
          <i className="fa fa-bars fa-spin" />
        </div>
      );
  }
}

function mapStateToProps(state) {
  return { user: state.user, counselors: state.counselors, users: state.user };
}

export default connect(
  mapStateToProps,
  { getUser, getCounselors, getUsers, requestCounselor, sendText }
)(MyCounselor);
