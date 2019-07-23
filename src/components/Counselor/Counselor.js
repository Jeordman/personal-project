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

        <Link to='/myCounselor' className='link-to'>
        <button className='link-button'>
          <i class="fa fa-external-link" />
        </button>
        </Link>

      </section>
    );
  }
}

export default Counselor;
