import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./counselor.css";

class Counselor extends Component {
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
    if (this.props.obj.counselor_id) {
      return (
        <section className="repeat">
          <section className='names'>
            <article>{first_name}</article>
            <article>{last_name}</article>
          </section>
          <Link to={`/myCounselor/${this.props.obj.counselor_id}`}>
            <img onError={this.addDefaultSrc} src={photo} className="images" />
          </Link>
        </section>
      );
    }

    if (this.props.obj.user_id) {
      return (
        <section className="repeat">
          <article>{first_name}</article>
          <article>{last_name}</article>
          <Link to={`/myCounselor/${this.props.obj.user_id}`}>
            <img onError={this.addDefaultSrc} src={photo} className="images" />
          </Link>
        </section>
      );
    }
  }
}

export default Counselor;
