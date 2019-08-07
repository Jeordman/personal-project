import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signupCounselor } from "../../ducks/counselorsReducer";
import "./counselorSignup.css";

class CounselorSignup extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      image: "",
      loading: false
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  signup = () => {
    let { username, password, first_name, last_name, image } = this.state;
    this.props.signupCounselor(
      username,
      password,
      first_name,
      last_name,
      image
    );
    this.setState({
      loading: true
    });
  };

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  render() {
    let { username, password, first_name, last_name, image } = this.state;
    let { loggedIn } = this.props.counselor;
    console.log("props", this.props);
    console.log("loggedIn", loggedIn);

    if (loggedIn) return <Redirect to="/" />;
    if (!this.state.loading) {
      return (
        <section className="counselor-signup-hold">
          {" "}
          <div className='fill-space-again'></div>
          <h2>Create Counselor Account</h2>
          <section className="main">
            <img
              onError={this.addDefaultSrc}
              src={this.state.image}
              className="img"
            />
            <section className="input-holder">
              <input
                type="text"
                value={image}
                name="image"
                onChange={this.handleInput}
                placeholder="IMAGE URL"
                className="input"
              />
              <input
                type="text"
                value={username}
                name="username"
                onChange={this.handleInput}
                placeholder="USERNAME"
                className="input"
              />
              <input
                type="password"
                value={password}
                name="password"
                onChange={this.handleInput}
                placeholder="PASSWORD"
                className="input"
              />
              <input
                type="text"
                value={first_name}
                name="first_name"
                onChange={this.handleInput}
                placeholder="FIRST NAME"
                className="input"
              />
              <input
                type="text"
                value={last_name}
                name="last_name"
                onChange={this.handleInput}
                placeholder="LAST NAME"
                className="input"
              />
            </section>
          </section>
          <section className="button-holder">
            <Link to={{ pathname: "/login" }}>
              <article className="login">Sign in</article>
            </Link>
            <button onClick={this.signup} className="signup">
              Sign up -->
            </button>
          </section>
        </section>
      );
    } else if (this.state.loading) {
      return (
        <div id="loader-wrapper">
          <div id="loader" />
        </div>
      );
    }
  }
}

//need to map state to props!!
function mapStateToProps(state) {
  console.log("state", state);
  return { counselor: state.counselors.user };
}
//add connect string
export default connect(
  mapStateToProps,
  { signupCounselor }
)(CounselorSignup);
