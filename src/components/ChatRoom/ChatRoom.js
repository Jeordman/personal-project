import React, { Component } from "react";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      showChat: false
    };
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  toggleChat = () => {
    this.setState({ showChat: !this.state.showChat})
  }

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

          <button onClick={() => this.toggleChat()}>BEGIN CHATTING</button>

          {this.state.showChat ? (
            <div>ey</div>
          ) : null}
          
        </div>
      );
    }

    if (thatCounselor) {
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

          {this.state.showChat ? (
            <div>ey</div>
          ) : null}
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
  { }
)(ChatRoom);

