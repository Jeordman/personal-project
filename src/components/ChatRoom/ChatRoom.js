import React, { Component } from "react";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getMatchingUserCounselor } from "../../ducks/requestCounselorReducer";

class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      showChat: false
    };
  }

  componentDidMount = () => {
    console.log(
      "lil bitch",
      +this.props.match.params.id,
      this.props.counselors.user.id,
      this.props.user.user.loggedIn
    );
    if (this.props.user.user.loggedIn) {
      this.props.getMatchingUserCounselor(
        this.props.user.user.id,
        +this.props.match.params.id
      );
    } else if (this.props.counselors.user.loggedIn) {
      this.props.getMatchingUserCounselor(
       +this.props.match.params.id,
        this.props.counselors.user.id
      );
    }
  };

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  toggleChat = () => {
    this.setState({ showChat: !this.state.showChat });
  };

  render() {
    let { error, redirect } = this.props.user;
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

    if (thatUser) {
      //if they are a counselor
      console.log("ass");
      const { first_name, last_name, photo } = thatUser;
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

          <button onClick={() => this.toggleChat()}>BEGIN CHATTING</button>

          {this.state.showChat ? <div>ey</div> : null}
        </div>
      );
    }

    if (thatCounselor) {
      console.log("bums");
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

          <button onClick={() => this.toggleChat()}>BEGIN CHATTING</button>

          {this.state.showChat ? <div>ey</div> : null}
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
  { getMatchingUserCounselor }
)(ChatRoom);
