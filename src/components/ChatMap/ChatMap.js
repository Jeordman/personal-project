import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./chatMap.css";

class ChatMap extends Component {
  constructor() {
    super();

    this.state = {};
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  render() {
    const { first_name, last_name, photo } = this.props.obj;
    console.log("ello?", this.props);

    if (this.props.userLoggedIn) {
      console.log("myprops", this.props);
      return (
        <section className="repeat">
          <article>{first_name}</article>
          <article>{last_name}</article>
          <Link to={`/chatRoom/${this.props.obj.counselor_id}`}>
            <img onError={this.addDefaultSrc} src={photo} className="images" />
          </Link>
        </section>
      );
    }

    if (this.props.counselorLoggedIn) {
      console.log("working?");
      return (
        <section className="repeat">
          <article>{first_name}</article>
          <article>{last_name}</article>
          <Link to={`/chatRoom/${this.props.obj.user_id}`} >
            <img onError={this.addDefaultSrc} src={photo} className="images" />
          </Link>
        </section>
      );
    } else {
      return <div>loading</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.user.loggedIn,
    counselorLoggedIn: state.counselors.user.loggedIn
  };
}

export default connect(
  mapStateToProps,
  {}
)(ChatMap);
