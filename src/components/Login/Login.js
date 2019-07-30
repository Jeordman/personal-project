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
      password: "",
      image:
        "https://images.unsplash.com/photo-1465145177017-c5b156cd4d14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      image2:
        "https://images.unsplash.com/photo-1500027014421-46ccc843776a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      image3:
        "https://images.unsplash.com/photo-1486044988991-ba1bd3194dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      image4:
        "https://images.unsplash.com/photo-1505150892987-424388901632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    let { username, password } = this.state;
    const { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;


    return (
      <div className='hold-all'>
        <article className="welcome-message">Welcome to</article>
        <article className="title">SAFE HAVEN</article>

        <section className="image-holder1">
          <img src={this.state.image} className="image" />
          <img src={this.state.image2} className="image2" />
        </section>
        <section className='image-holder2'>
        <img src={this.state.image3} className="image3" />
        <img src={this.state.image4} className="image4" />
        </section>
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
        <article className="no-account">Don't have an account?</article>
        <section className="button-holder">
          <Link to={{ pathname: "/signup" }}>
            <div className="signup">Sign up</div>
          </Link>
          <button onClick={this.handleLogin} className="login">
            Sign in -->
          </button>
        </section>

        <footer>
          <section className="emergency-info">
            <article>Are you a counselor?</article>
            <Link to={{ pathname: "/counselorLogin" }}>
              <div className="emergency">Login Here</div>
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
