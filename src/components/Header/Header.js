import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../ducks/userReducer";
import { Link } from "react-router-dom";
import "./header.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
  }

  toggleMenu = () => {
      this.setState({showMenu: !this.state.showMenu})
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="logo">Logo</div>
          <button className="menu-btn-content" onClick={this.toggleMenu}>
            <i className="fa fa-bars fa-lg" />
          </button>
        </div>
        {this.state.showMenu ? (
          <div
            className="nav-menu"
          >
            <Link to={{ pathname: '/' }}>
            <button className="nav-link"> Dashboard </button>
            </Link>

            <button className="nav-link" onClick={this.props.logout}>
              {" "}
              logout
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state.user;
}

export default connect(
  mapStateToProps,
  { logout }
)(Header);
