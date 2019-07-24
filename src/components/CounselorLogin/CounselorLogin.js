import React, { Component } from "react";
import { connect } from "react-redux";
import { loginCounselor } from "../../ducks/counselorsReducer";
import { Link, Redirect } from 'react-router-dom'
import './counselorLogin.css'

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
  };

  handleLogin = () => {
    this.props.loginCounselor(this.state.username, this.state.password);
  };

  render() {
    // console.log(this.state)
    console.log('cLogin props', this.props)

    const { user } = this.props;
    console.log('user in CLogin', user)
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

        <section className="button-holder">
        <Link to={{ pathname: "/CounselorSignup" }}>
            <div className="signup">Sign up</div>
          </Link>

        <button onClick={this.handleLogin} className='login'>Sign In</button>
        </section>
        <article className="author">created by Jeordin Callister</article>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.counselors;
}

export default connect(
  mapStateToProps,
  { loginCounselor }
)(CounselorLogin);
