import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUser,
  getUsers,
  editUser,
  getQuotes
} from "../../ducks/userReducer";
import { getCounselors, editCounselor } from "../../ducks/counselorsReducer";
import Header from "../Header/Header";
import Counselor from "../Counselor/Counselor";
import "./dashboard.css";
import "../Survey/Survey";
import Survey from "../Survey/Survey";
import RequestInbox from "../RequestInbox/RequestInbox";
import {
  getAcceptedUsers,
  getAcceptedCounselors
} from "../../ducks/requestCounselorReducer";

import ChatRoom from "../ChatRoom/ChatRoom";
import ChatMap from "../ChatMap/ChatMap";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user.user,

      counselor_id: props.counselor.id,
      counselor_first_name: props.counselor.first_name,
      counselor_last_name: props.counselor.last_name,
      counselor_photo: props.counselor.photo,
      counselor_info: props.counselor.info,

      user_id: props.user.user.id,
      user_first_name: props.user.user.first_name,
      user_last_name: props.user.user.last_name,
      user_photo: props.user.user.photo,
      user_info: props.user.user.info,
      editing: false
    };
  }

  componentDidMount() {
    this.props.getCounselors();
    this.props.getUsers();

    if (this.props.counselor.loggedIn) {
      this.props.getAcceptedUsers(this.props.counselor.id);
    }

    if (this.props.user.user.loggedIn) {
      this.props.getAcceptedCounselors(this.props.user.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.acceptedUsers !== this.props.acceptedUsers) {
      this.render();
    } else if (prevProps.acceptedCounselors !== this.props.acceptedCounselors) {
      this.render();
    }
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  edit = () => {
    this.setState({ editing: true });
  };

  saveChangesUser = () => {
    const {
      user_id,
      user_first_name,
      user_last_name,
      user_photo,
      user_info
    } = this.state;
    this.props.editUser(
      user_id,
      user_first_name,
      user_last_name,
      user_photo,
      user_info
    );
    this.setState({ editing: false });
  };

  saveChangesCounselor = () => {
    const {
      counselor_id,
      counselor_first_name,
      counselor_last_name,
      counselor_photo,
      counselor_info
    } = this.state;
    this.props.editCounselor(
      counselor_id,
      counselor_first_name,
      counselor_last_name,
      counselor_photo,
      counselor_info
    );
    this.setState({ editing: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  cancel = () => {
    this.setState({ editing: false });
    this.setState({
      counselor_id: this.props.counselor.id,
      counselor_first_name: this.props.counselor.first_name,
      counselor_last_name: this.props.counselor.last_name,
      counselor_photo: this.props.counselor.photo,
      counselor_info: this.props.counselor.info,

      user_id: this.props.user.user.id,
      user_first_name: this.props.user.user.first_name,
      user_last_name: this.props.user.user.last_name,
      user_photo: this.props.user.user.photo,
      user_info: this.props.user.user.info
    });
  };

  render() {
    let { editing, newInfo } = this.state;
    let { error, redirect } = this.props.user;
    let { counselorError, counselorRedirect } = this.props;
    if (error || redirect || counselorError || counselorRedirect)
      return <Redirect to="/login" />;

    if (this.props.user.user.loggedIn) {
      let { user } = this.props.user;
      return (
        <div className="full-dash-holder">
          <div className="desktop-dash-left">
            <Header />
            <section className="img-holder-center">
              <img
                onError={this.addDefaultSrc}
                src={this.state.user_photo}
                className="user-pic"
              />
            </section>
            <h2>
              Welcome{" "}
              {`${this.state.user_first_name} ${this.state.user_last_name}`}
            </h2>

            {editing ? (
              <div className="dark-dash">
                <div className="full-edit-inputs">
                  <section className="first-two-inputs">
                    <input
                      value={this.state.user_first_name} //what we are changing (on props) (the info)
                      onChange={this.handleChange} //normal handle change
                      name="user_first_name"
                    />
                    <input
                      value={this.state.user_last_name} //what we are changing (on props) (the info)
                      onChange={this.handleChange} //normal handle change
                      name="user_last_name"
                    />
                  </section>
                  <input
                    value={this.state.user_photo} //what we are changing (on props) (the info)
                    onChange={this.handleChange} //normal handle change
                    name="user_photo"
                    className="edit-photo-url"
                  />

                  <section className="bio-center">BIO</section>
                  <textarea
                    value={this.state.user_info} //what we are changing (on props) (the info)
                    onChange={this.handleChange} //normal handle change
                    name="user_info"
                    className="homepage-bio"
                  />

                  <div>
                    <section className="save-cancel-home">
                      <button
                        onClick={this.saveChangesUser}
                        className="save-cancel-home"
                      >
                        save changes
                      </button>
                      <button
                        onClick={this.cancel}
                        className="save-cancel-home"
                      >
                        cancel{" "}
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            ) : null}
            {editing ? null : (
              <section className="all-bio-info">
                <section className="bio-before-edit-holder">
                  <button onClick={this.edit} className="edit-dash">
                    Edit Profile
                  </button>
                  <section className="bio-before">BIO</section>

                  <article className="bio-before-edit">
                    {this.state.user_info}
                  </article>
                </section>
              </section>
            )}

            <Survey />
          </div>
          <div className="desktop-dash-right">
            <h4 className="h4">Active Conversations</h4>

            <section className="scroll-right">
              {this.props.acceptedCounselors.map(obj => {
                return (
                  <div>
                    <ChatMap obj={obj} />
                  </div>
                );
              })}
            </section>

            <h4 className="h4">Counselors</h4>
            <section className="scroll-right">
              {this.props.counselors.map(obj => {
                return (
                  <div>
                    <Counselor obj={obj} />
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      );
    }

    //--------------------------------------------------------------//------------------------------- if counselor
    if (this.props.counselor.loggedIn) {
      let { counselor: counselorUser } = this.props;
      let { counselorError, counselorRedirect } = this.props;
      if (counselorError || counselorRedirect) return <Redirect to="/login" />;
      return (
        <div className="full-dash-holder-counselor">
          <div className="desktop-dash-left">
            <Header />
            <section className="img-holder-center">
              <img
                onError={this.addDefaultSrc}
                src={this.state.counselor_photo}
                className="user-pic"
              />
            </section>
            <h2>
              Welcome{" "}
              {`${this.state.counselor_first_name} ${
                this.state.counselor_last_name
              }`}
            </h2>

            {editing ? (
              <div className="dark-dash-counselor">
                <div className="full-edit-inputs">
                  <section className="first-two-inputs">
                    <input
                      value={this.state.counselor_first_name} //what we are changing (on props) (the info)
                      onChange={this.handleChange} //normal handle change
                      name="counselor_first_name"
                    />
                    <input
                      value={this.state.counselor_last_name} //what we are changing (on props) (the info)
                      onChange={this.handleChange} //normal handle change
                      name="counselor_last_name"
                    />
                  </section>
                  <input
                    value={this.state.counselor_photo} //what we are changing (on props) (the info)
                    onChange={this.handleChange} //normal handle change
                    name="counselor_photo"
                    className="edit-photo-url"
                  />
                  <input
                    value={this.state.counselor_info} //what we are changing (on props) (the info)
                    onChange={this.handleChange} //normal handle change
                    name="counselor_info"
                    className="homepage-bio"
                  />

                  <div>
                    <section className="save-cancel-home">
                      <button
                        onClick={this.saveChangesCounselor}
                        className="save-cancel-home"
                      >
                        save changes
                      </button>
                      <button
                        onClick={this.cancel}
                        className="save-cancel-home"
                      >
                        cancel{" "}
                      </button>
                    </section>
                  </div>
                </div>
              </div>
            ) : null}
            {editing ? null : (
              <section className="all-bio-info">
                <section className="bio-before-edit-holder">
                  <button onClick={this.edit} className="edit-dash">
                    Edit Profile
                  </button>
                  <section className="bio-before">BIO</section>

                  <article className="bio-before-edit">
                    {this.state.counselor_info}
                  </article>
                </section>
              </section>
            )}

            <RequestInbox />
          </div>
          <div className="desktop-dash-right">
            <h4 className="h4">Users</h4>

            <section className="scroll-right">
              {this.props.acceptedUsers.map(obj => {
                //dont know why I am mapping over this !!!!!
                return (
                  <div>
                    <ChatMap obj={obj} />
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

function mapStateToProps(state) {
  return {
    userReducerState: state.user,
    counselorReducerState: state.counselors,
    user: state.user,
    counselors: state.counselors.counselors,
    counselor: state.counselors.user,
    users: state.user.users,
    counselorError: state.counselors.error,
    counselorRedirect: state.counselors.redirect,
    acceptedUsers: state.requestCounselor.acceptedUsers,
    acceptedCounselors: state.requestCounselor.acceptedCounselors
  };
}

export default connect(
  mapStateToProps,
  {
    getUser,
    getCounselors,
    getUsers,
    editCounselor,
    editUser,
    getQuotes,
    getAcceptedUsers,
    getAcceptedCounselors
  }
)(Dashboard);
