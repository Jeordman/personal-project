import React, { Component } from "react";
import { signup } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./signup.css";

class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      image: ""
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  signup = () => {
    let { username, password, first_name, last_name, image } = this.state;
    this.props.signup(username, password, first_name, last_name, image);
  };

  addDefaultSrc(ev){
  ev.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA'
}

  render() {
    let { username, password, first_name, last_name, image } = this.state;
    let { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;

    return (
      <section>
        <section className="main">
          <img onError={this.addDefaultSrc} src={this.state.image} className="img" />
          <section className="input-holder">
            <input
              type="text"
              value={image}
              name="image"
              onChange={this.handleInput}
              placeholder="IMAGE URL"
              className='input'
            />
            <input
              type="text"
              value={username}
              name="username"
              onChange={this.handleInput}
              placeholder="USERNAME"
              className='input'
            />
            <input
              type="password"
              value={password}
              name="password"
              onChange={this.handleInput}
              placeholder="PASSWORD"
              className='input'
            />
            <input
              type="text"
              value={first_name}
              name="first_name"
              onChange={this.handleInput}
              placeholder="FIRST NAME"
              className='input'
            />
            <input
              type="text"
              value={last_name}
              name="last_name"
              onChange={this.handleInput}
              placeholder="LAST NAME"
              className='input'
            />
          </section>
        </section>
        <button onClick={this.signup}>SIGN UP</button>
      </section>
    );
  }
}

//need to map state to props!!
function mapStateToProps(state) {
  return state.user;
}
//add connect string
export default connect(
  mapStateToProps,
  { signup }
)(Signup);
