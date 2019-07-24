import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getCounselors } from "../../ducks/counselorsReducer";
import { getUsers } from '../../ducks/userReducer'
import "./myCounselor.css";

class MyCounselor extends Component {
  componentDidMount() {
    this.props.getCounselors();
    this.props.getUsers();
  }

  render() {
    // console.log(this.props.users)
    let { user, error, redirect} = this.props.user;
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
    const thisUser = this.props.users.users.filter(
      id => id.user_id === +counselorId
    )
    //insert ternary
    const thatCounselor = thisCounselor[0];
    const thatUser = thisUser[0]
    console.log('thatusussss', thatUser)
    if (error || redirect) return <Redirect to="/login" />;


    if (thatUser) {
      const { first_name, last_name, photo } = thatUser;
      console.log(first_name, last_name, photo);
       return (
        <div>
          <Header />
          <h1 className="holder">
            {`${first_name} ${last_name}`}
            <img src={photo} className="profile-pic" />
          </h1>
        </div>
      );
    } 

    if (thatCounselor) {
      console.log("ey", thatCounselor);
      const { first_name, last_name, photo } = thatCounselor;
      console.log(first_name, last_name, photo);

      return (
        <div>
          <Header />
          <h1 className="holder">
            {`${first_name} ${last_name}`}
            <img src={photo} className="profile-pic" />
          </h1>
        </div>
      );
    }  else return <h1>loading</h1>
    
  }
}

function mapStateToProps(state) { //console.log('this is state', state)
  return { user: state.user, counselors: state.counselors, users: state.user };
}

export default connect(
  mapStateToProps,
  { getUser ,getCounselors, getUsers }
)(MyCounselor);
