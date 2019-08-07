import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../ducks/userReducer";
import { logoutCounselor } from "../../ducks/counselorsReducer";
import { logoutJournal } from "../../ducks/journalReducer";
import { Link, Redirect, withRouter } from "react-router-dom";
import { logoutRequestCounselor } from "../../ducks/requestCounselorReducer";
import { getUserJournal } from "../../ducks/journalReducer";
import "./header.css";

import { slideInDown } from "react-animations";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
      this.props.getUserJournal(this.props.user.id);
  };

  

  handleLogout = async () => {
    await this.props.logout();
    await this.props.logoutJournal();
    await this.props.logoutCounselor();
    await this.props.logoutRequestCounselor();
    this.props.history.push("/login");
  };

  render() {
    //user login
    console.log("prooops", this.props);
   
    if (!this.props.counselorReducerState.counselor) {
      return (
        <div classNam="hold-all-header">
          <div className="header" style={{ zIndex: 8 }}>
            <img
              src={
                "https://images.unsplash.com/photo-1457545255860-f9dc39332def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
              }
              className="img-logo"
            />
            <button className="menu-btn-content" onClick={this.toggleMenu}>
              <i className="fa fa-bars fa-lg" />
            </button>
          </div>
          {this.state.showMenu ? (
            <div className="dark-dash-menu" style={{ zIndex: 7 }}>
              <div className="nav-menu">
                <Link to={{ pathname: "/" }}>
                  <button className="nav-link"> Dashboard </button>
                </Link>
                <Link to={`/myGraph`}>
                  <button className="nav-link">My Graph</button>
                </Link>
                {this.props.journalEntries[0] ? (
                  <Link to={{ pathname: "/Journal" }}>
                    <button className="nav-link"> Journal </button>
                  </Link>
                ) : null}
                <button
                  style={{ zIndex: 6 }}
                  className="nav-link"
                  onClick={this.handleLogout}
                >
                  logout user
                </button>
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    //counselor login
    if (this.props.counselorReducerState.counselor) {
      return (
        <div classNam="hold-all-header">
          <div className="header" style={{ zIndex: 8 }}>
            <img
              src={
                "https://images.unsplash.com/photo-1457545255860-f9dc39332def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"
              }
              className="img-logo"
            />

            <button className="menu-btn-content" onClick={this.toggleMenu}>
              <i className="fa fa-bars fa-lg" />
            </button>
          </div>
          {this.state.showMenu ? (
            <div className="dark-dash-counselor-menu">
              <div className="nav-menu">
                <Link to={{ pathname: "/" }}>
                  <button className="nav-link"> Dashboard </button>
                </Link>
                <button
                  style={{ zIndex: 6 }}
                  className="nav-link"
                  onClick={this.handleLogout}
                >
                  logout counselor
                </button>
              </div>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    userReducerState: state.user,
    counselorReducerState: state.counselors,
    user: state.user.user,
    journalEntries: state.journal.journalEntries
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      logout,
      logoutCounselor,
      logoutJournal,
      logoutRequestCounselor,
      getUserJournal
    }
  )(Header)
);
