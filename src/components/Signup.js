import React, { Component } from "react";
import { signup } from "../ducks/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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

  render() {
    let { username, password, first_name, last_name, image } = this.state;
    let { user } = this.props
    if (user.loggedIn) return <Redirect to='/' />

    return (
      <h1>
        THIS IS SIGNUP
        <input
          type="text"
          value={image}
          name="image"
          onChange={this.handleInput}
          placeholder="IMAGE URL"
        />
        <input
          type="text"
          value={username}
          name="username"
          onChange={this.handleInput}
          placeholder="USERNAME"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={this.handleInput}
          placeholder="PASSWORD"
        />
        <input
          type="text"
          value={first_name}
          name="first_name"
          onChange={this.handleInput}
          placeholder="FIRST NAME"
        />
        <input
          type="text"
          value={last_name}
          name="last_name"
          onChange={this.handleInput}
          placeholder="LAST NAME"
        />
        <button onClick={this.signup}>SIGN UP</button>
      </h1>
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
