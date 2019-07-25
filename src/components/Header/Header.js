import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../ducks/userReducer";
import { logoutCounselor } from "../../ducks/counselorsReducer";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./header.css";
import { async } from "q";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  handleCounselorLogout = async () => {
   await this.props.logoutCounselor()
    this.props.history.push('/login')
    // return <Redirect to="/login"/>
  }

  handleUserLogout = async () => {
    await this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    //user login
    if(!this.props.counselorReducerState.counselor) {

      return (
        <div>
          <div className="header">
            <div className="logo">Logo</div>
            <button className="menu-btn-content" onClick={this.toggleMenu}>
              <i className="fa fa-bars fa-lg" />
            </button>
          </div>
          {this.state.showMenu ? (
            <div className="nav-menu">
              <Link to={{ pathname: "/" }}>
                <button className="nav-link"> Dashboard </button>
              </Link>
  
              <button style={{ zIndex: 6 }} className="nav-link" onClick={this.handleUserLogout}>
                logout user
              </button>
            </div>
          ) : null}
        </div>
      );
    }
  
    //counselor login
    if(this.props.counselorReducerState.counselor){
    return (
      <div>
        <div className="header">
          <div className="logo">Logo</div>
          <button className="menu-btn-content" onClick={this.toggleMenu}>
            <i className="fa fa-bars fa-lg" />
          </button>
        </div>
        {this.state.showMenu ? (
          <div className="nav-menu">
            <Link to={{ pathname: "/" }}>
              <button className="nav-link"> Dashboard </button>
            </Link>

            <button style={{ zIndex: 6}} className="nav-link" onClick={this.handleCounselorLogout}>
              logout counselor
            </button>
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
    counselorReducerState: state.counselors
  };
}

export default withRouter(connect(
  mapStateToProps,
  { logout, logoutCounselor }
)(Header));
