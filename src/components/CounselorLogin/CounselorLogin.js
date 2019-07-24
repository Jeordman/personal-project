import React, { Component } from "react";
import { connect } from "react-redux";
import { loginCounselor } from "../../ducks/counselorsReducer";
import { Link, Redirect } from 'react-router-dom'

class CounselorLogin extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }
  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleLogin = () => {
    this.props.loginCounselor(this.state.username, this.state.password);
  };

  render() {
    console.log(this.state)
    console.log(this.props)

    const { user } = this.props;
    if (user.loggedIn) return <Redirect to="/" />;
    return (
      <div>
        <h1>Counselor</h1>
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
        <Link to={{ pathname: "/CounselorSignup" }}>
            <div className="signup">Sign up</div>
          </Link>
        <button onClick={this.handleLogin}>Sign In</button>

        <article className="author">created by Jeordin Callister</article>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { loginCounselor }
)(CounselorLogin);
