import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getCounselors } from "../../ducks/counselorsReducer";
import { getUsers } from "../../ducks/userReducer";
import { requestCounselor } from "../../ducks/requestCounselorReducer";
import "./myCounselor.css";

class MyCounselor extends Component {
  componentDidMount() {
    this.props.getCounselors();
    this.props.getUsers();
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  render() {
    let { user, error, redirect } = this.props.user;
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
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

    if (thatUser) {
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

    if (thatCounselor) {
      const { first_name, last_name, photo } = thatCounselor;
      console.log("props", thatCounselor.counselor_id);
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
          <button
            className="request-counselor-button"
            onClick={() => this.props.requestCounselor(this.props.user.user.id,thatCounselor.counselor_id)}
          >
            REQUEST COUNSELOR
          </button>
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
  { getUser, getCounselors, getUsers, requestCounselor }
)(MyCounselor);
