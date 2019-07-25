import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, getUsers  } from "../../ducks/userReducer";
import { getCounselors, editCounselor } from "../../ducks/counselorsReducer";
import Header from "../Header/Header";
import Counselor from "../Counselor/Counselor";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user.user,

      counselor_first_name: props.counselor.first_name,
      counselor_last_name: props.counselor.last_name,
      counselor_photo: props.counselor.photo,
      counselor_info: props.counselor.info,

      editing: false
    };
  }

  componentDidMount() {
    this.props.getCounselors();
    this.props.getUsers();
  }

//   componentDidUpdate(prevProps) {
//     this.props.getUser()
//    if(prevProps.user !== this.props.user) this.props.getUser()
//   } 

  edit = () => {
    this.setState({editing: true})
  }

  saveChanges = () => {
      // const { counselor_first_name, counselor_last_name, counselor_photo, counselor_info } = this.state
  
      // this.props.editCounselor(,counselor_first_name, counselor_last_name, counselor_photo, counselor_info)
      // this.setState({editing: false})

  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {
      
    let { editing, newInfo } = this.state
   
    //Redirect/loggedIn
    // if (!user.loggedIn || !counselorUser.loggedIn) return <div>LOADING</div>;
    let { error, redirect } = this.props.user
    let { counselorError, counselorRedirect } = this.props
    if (error || redirect || counselorError || counselorRedirect) return <Redirect to="/login" />;
    
    if (this.props.user.user.loggedIn) {
      let { user } = this.props.user;
      return (
        <div>
          <Header />
          <img src={user.photo} className="user-pic" />
          <h2>Welcome {user.first_name}</h2>
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
      );
    }

    //------------------------------- if counselor
//--------------------------------------------------------------
    if (this.props.counselor.loggedIn) {
      let { counselor: counselorUser } = this.props
      let { counselorError, counselorRedirect } = this.props
      if (counselorError || counselorRedirect) return <Redirect to="/login" />;
      return (
        
        <div>
          <Header />
          <img src={counselorUser.photo} className="user-pic" />
          <h2>Welcome {counselorUser.first_name}</h2>
          

          {editing ? (
            <div>
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
              <input
                value={this.state.counselor_photo} //what we are changing (on props) (the info)
                onChange={this.handleChange} //normal handle change
                name="counselor_photo"
              />
              <input
                value={this.state.counselor_info} //what we are changing (on props) (the info)
                onChange={this.handleChange} //normal handle change
                name="counselor_info"
              />
            </div>
          ) : (
            <div>
              <p>
    
                {/* {" "}
                Hero:{" "}
                {this.props.charactersTwo[0] &&
                  this.props.charactersTwo[this.props.iTwo].name}{" "} */}
              </p>
            </div>
          )}
          {editing ? (
            // <button onClick={this.saveChanges}>save changes</button>
            <button onClick={this.saveChanges}>save changes</button>
          ) : (
            // <button onClick={this.edit}> Edit </button>
            <button onClick={this.edit}>Edit</button>
          )}


          <h4 className="h4">Users</h4>
          <section className="scroll-down">
            {this.props.users.map(obj => {
              return (
                <div>
                  <Counselor obj={obj} />
                </div>
              );
            })}
          </section>
        </div>
      );
    } else {
      
      return <Redirect to="/login" />
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
    checker: state.counselors.counselors[0]
  };
}

export default connect(
  mapStateToProps,
  { getUser, getCounselors, getUsers, editCounselor }
)(Dashboard);
