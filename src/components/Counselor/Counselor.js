import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./counselor.css";

class Counselor extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    console.log(this.props.obj);
    const { first_name, last_name, photo } = this.props.obj;
    console.log(first_name);
    return (
      <section className="repeat">
        <article>{first_name}</article>
        <article>{last_name}</article>
        <img src={photo} className="images" />
        <Link to={`/myCounselor/${this.props.obj.counselor_id}`} className='link-to'>
        <button className='link-button'>
          <i className="fa fa-external-link fa-sp" />
        </button>
        </Link>

      </section>
    );
  }
}

export default Counselor;
