import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
import { getUsers } from '../../ducks/userReducer'
import { getCounselors } from "../../ducks/counselorsReducer";
import Header from "../Header/Header";
import Counselor from "../Counselor/Counselor";
import "./dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      ey: 0
    };
  }

  componentDidMount() {
    if (!this.props.user.loggedIn) {
      this.props.getUser();
    }
    this.props.getCounselors()
    this.props.getUsers()
  }


  render() {
    let { user, error, redirect } = this.props.user;
    // console.log('propsss', this.props.getCounselors())
    // const counselors = this.props.getCounselors();
    // console.log("count", counselors);
    console.log('oriii',this.props.user);
    console.log('this is user', user.counselor)
    // console.log(user, error, redirect);

    
    if (error || redirect) return <Redirect to="/login" />;
    if (!user.loggedIn) return <div>LOADING</div>;

    if(!user.counselor) {
    return (
      <div>
        <Header />
        <img src={user.photo} className="user-pic" />
        <h2>Welcome {user.first_name}</h2>
        <h4 className='h4'>Counselors</h4>
        <section className="scroll-right"> 
        {this.props.counselors.map(obj => {
          return (<div>
            < Counselor obj={obj}/>
          </div>)
        })}
        </section>
      </div>
    );
      }

    if(user.counselor) {
      return (
        <div>
        < Header />
        <img src={user.photo} className="user-pic" />
        <h2>Welcome {user.first_name}</h2>
        <h4 className='h4'>Users</h4>
        <section className="scroll-down"> 
        {this.props.users.map(obj => {
          return (<div>
            < Counselor obj={obj}/>
          </div>)
        })}
        </section>
      </div>
      )
    }
  }
}

function mapStateToProps(state) { console.log('this is state', state.user.users)
  return { user: state.user, counselors: state.counselors.counselors, users: state.user.users }
}

export default connect(
  mapStateToProps,
  { getUser, getCounselors, getUsers }
)(Dashboard);
