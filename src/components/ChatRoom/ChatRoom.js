import React, { Component } from "react";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getMatchingUserCounselor } from "../../ducks/requestCounselorReducer";
import io from "socket.io-client";
import "./chatRoom.css";

class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      showChat: false,

      joined: false, //from example
      newMessageInput: "",
      newMessageInputUser: "",
      messages: [],
      room: 0
    };
  }

  componentDidMount = () => {
    if (this.props.user.user.loggedIn) {
      this.props.getMatchingUserCounselor(
        this.props.user.user.id,
        +this.props.match.params.id
      );
    } else if (this.props.counselors.user.loggedIn) {
      this.props.getMatchingUserCounselor(
        +this.props.match.params.id,
        this.props.counselors.user.id
      );
    }

    this.socket = io();
    this.socket.on("room entered", data => {
      console.log("hit", data);
      this.joinSuccess(data);
    });

    this.socket.on("message sent", data => {
      console.log("hit message sent", data);
      this.updateMessages(data);
    });
  };

  componentWillUnmount = () => {
    this.socket.disconnect();
  };

  sendMessageUser = () => {
    this.socket.emit("send message", {
      message: this.state.newMessageInputUser,
      room: this.state.room,
      sender: this.props.user.user.first_name, //figure out
      is_counselor: false //figure out
    });
  };

  sendMessageCounselor = () => {
    this.socket.emit("send message", {
      message: this.state.newMessageInput,
      room: this.state.room,
      sender: this.props.counselors.user.first_name, //figure this out
      is_counselor: true //figure out
    });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState(
        {
          room: this.props.room.user_counselor_id
        },
        () => {
          if (this.state.room !== 0) {
            this.socket.emit("enter room", {
              room: this.state.room
            });
          }
        }
      );
    }
  }

  updateMessages = messages => {
    console.log("message hit", messages);
    this.setState({
      messages: messages
    });
  };

  joinSuccess = messages => {
    this.setState({
      joined: true,
      messages
    });
  };

  addDefaultSrc(ev) {
    ev.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvlhaYgj0EeSjYPBSHNY3xacbupTZ_EnCvlSWoyJB7jMa1wuhdeA";
  }

  render() {
    let { error, redirect } = this.props.user;
    let counselorId = this.props.match.params.id;
    const thisCounselor = this.props.counselors.counselors.filter(
      id => id.counselor_id === +counselorId
    );
    const thisUser = this.props.users.users.filter(
      id => id.user_id === +counselorId
    );
    //insert ternary
    const thatCounselor = thisCounselor[0];
    const thatUser = thisUser[0];
    if (error || redirect) return <Redirect to="/login" />;

    if (!thatCounselor && !thatUser) {
      if (this.props.user.user) return <Redirect to="/login" />;
      if (this.props.counselor) return <Redirect to="/login" />;
    }

    if (thatUser) {
      //if they are a counselor
      // if (this.props.room) console.log(this.props.room.user_counselor_id)
      console.log("state", this.state);
      console.log("props", this.props);
      const { first_name, last_name, photo } = thatUser;
      return (
        <div className="holder">
          <Header />
          <h1>
            {`${first_name} ${last_name}`}
            <img
              onError={this.addDefaultSrc}
              src={photo}
              className="profile-pic"
            />
          </h1>

          <div>
            {this.state.joined ? <h1>My Room: {this.state.room}</h1> : null}
            <div>
              {this.state.messages.map(messageObj => (
                <h2 key={messageObj.id}>{messageObj.message}</h2>
              ))}
            </div>
            {this.state.joined ? (
              <div>
                <input
                  type="text"
                  name="newMessageInput"
                  value={this.state.newMessageInput}
                  onChange={this.handleInput}
                />
                <button onClick={this.sendMessageCounselor}>Send</button>
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    if (thatCounselor) {
      //if they are a user
      console.log(this.state.counselors);
      const { first_name, last_name, photo } = thatCounselor;
      return (
        <div className="holder">
          <Header />
          <h1>
            {`${first_name} ${last_name}`}
            <img
              onError={this.addDefaultSrc}
              src={photo}
              className="profile-pic"
            />
          </h1>

          <div>
            {this.state.joined ? <h1>My Room: {this.state.room}</h1> : null}
            <div className="mapped-message-holder">
              {this.state.messages.map((
                messageObj //change this mapping function... new component?
              ) => (
                <h2 className="chat-repeating" key={messageObj.id}>
                  {messageObj.is_counselor ? (
                    <div className='received-message'>
                      <div className='received-message-color'>{messageObj.message}</div>
                      <img className='messaging-picture' src={photo} />
                    </div>
                  ) : (
                    <div className='sent-message'>
                      <div className='sent-message-color'>{messageObj.message}</div>{" "}
                      <img className='messaging-picture' src={this.props.user.user.photo} />
                    </div>
                  )}
                </h2>
              ))}
            </div>
            {this.state.joined ? (
              <div>
                <input
                  type="text"
                  name="newMessageInputUser"
                  value={this.state.newMessageInputUser}
                  onChange={this.handleInput}
                />
                <button onClick={this.sendMessageUser}>Send</button>
              </div>
            ) : null}
          </div>
        </div>
      );
    } else
      return (
        <div className="loading-spin">
          <i className="fa fa-bars fa-spin" />
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    counselors: state.counselors,
    users: state.user,
    room: state.requestCounselor.userCounselorMatch[0]
  };
}

export default connect(
  mapStateToProps,
  { getMatchingUserCounselor }
)(ChatRoom);
