import React, { Component } from "react";
import { login } from "../../ducks/userReducer";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./login.css";

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
        <article className="welcome-message">Welcome to</article>
        <article className="title">SAFE HAVEN</article>
        <article className="page-label">Sign in</article>

        <section className="input-holder">
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            onChange={this.handleInput}
            className="input"
          />
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            onChange={this.handleInput}
            className="input"
          />
        </section>
        <article className='no-account' >Don't have an account?</article>
        <section className="button-holder">
          <Link to={{ pathname: "/signup" }}>
            <div className="signup">Sign Up</div>
          </Link>
          <button onClick={this.handleLogin} className="login">
            Login
          </button>
        </section>

        <footer>
          <section className="emergency-info">
            <article>Emergency?</article>
            <Link to={{ pathname: "/emergency" }}>
              <div className="emergency">HERE</div>
            </Link>
          </section>

          <article className="author">created by Jeordin Callister</article>
        </footer>
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
