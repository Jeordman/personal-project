import React, { Component } from "react";
import { login } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleLogin = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    let { username, password } = this.state;
    const { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;

    console.log("props", this.props);

    return (
      <div>
        <h1>THIS IS LOGIN</h1>
        <article>SIGN IN</article>
        <input
          type="text"
          name="username"
          placeholder="USERNAME"
          onChange={this.handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="PASSWORD"
          onChange={this.handleInput}
        />
        <button onClick={this.handleLogin}>
            Login
          </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { login }
)(Login);
