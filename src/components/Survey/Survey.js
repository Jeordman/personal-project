import React, { Component } from "react";
import "./survey.css";
import Dashboard from "../Dashboard/Dashboard";
import { connect } from "react-redux";
import { completeSurvey, addToJournal } from "../../ducks/userReducer";
import { Link } from "react-router-dom";

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: props.user.id,

      date: "",
      mood: "",
      question: 1,

      note: ""
    };
  }

  next = () => {
    let now = this.state.question;
    if (this.state.question <= 4) {
      this.setState({ question: (now += 1) });
    }
  };

  back = () => {
    let now = this.state.question;
    if (this.state.question >= 2) {
      this.setState({ question: (now -= 1) });
    }
  };

  submit = () => {
    let now = this.state.question;
    if (
      this.state.date === "" ||
      this.state.mood === "" ||
      this.state.note === ""
    ) {
      this.setState({ question: 2, date: "", mood: "", note: "" });
      return alert("OOPS... You forgot to fill out all of the questions");
    } else if (Number.isInteger(this.state.mood)) {
      //not working
      this.setState({ question: 2, date: "", mood: "", note: "" });
      return alert("Make sure you rated your day with a number");
    } else {
      this.setState({ question: (now += 1) });
      console.log("state", this.state, this.props);
      this.props.completeSurvey(
        this.state.user_id,
        this.state.date,
        this.state.mood
      );
      this.props.addToJournal(
        this.state.user_id,
        this.state.date,
        this.state.mood,
        this.state.note
      );
    }
  };

  start = () => {
    this.setState({
      question: 1, date: "", mood: "", note: ""
    })
  }

  beginAgain = () => {
    this.setState({ question: 2, date: "", mood: "", note: "" });
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.question === 1) {
      console.log("state", this.state, this.props);
      return (
        <div className="first-survey-container">
          <section className="next-back">
            <button onClick={this.next} className="survey-text">
              Begin Survey
            </button>
          </section>
        </div>
      );
    } else if (this.state.question === 2) {
      return (
        <div className="dark-dash">
          <div className="survey-container">
            <div className="survey-question">What is the date?</div>
            <section className="align-input-center">
              <input
                name={"date"}
                value={this.state.date}
                onChange={this.handleInput}
                className="input-color"
              />
            </section>
            <section className="next-back">
              <button onClick={this.back} className="next-back">
                Back
              </button>
              <button onClick={this.next} className="next-back">
                Next
              </button>
            </section>
          </div>
        </div>
      );
    } else if (this.state.question === 3) {
      return (
        <div className="dark-dash">
          <div className="survey-container">
            <div className="survey-question">
              How do you feel on a scale 1-10
            </div>
            <section className="align-input-center">
              <input
                name={"mood"}
                value={this.state.mood}
                onChange={this.handleInput}
                className="input-color"
              />
            </section>
            <section className="next-back">
              <button onClick={this.back} className="next-back">
                Back
              </button>
              <button onClick={this.next} className="next-back">
                Next
              </button>
            </section>
          </div>
        </div>
      );
    } else if (this.state.question === 4) {
      return (
        <div className="dark-dash" >
          <div className="survey-container">
            <div className="survey-question">
              {" "}
              Please write a little about your day
            </div>
            <section className="align-input-center">
              <textarea
                name={"note"}
                value={this.state.note}
                onChange={this.handleInput}
                className="textarea-journal"
              />
            </section>
            <section className="next-back">
              <button onClick={this.back} className="next-back">
                Back
              </button>
              <button onClick={this.submit} className="next-back">
                Submit
              </button>
            </section>
          </div>
        </div>
      );
    } else if (this.state.question === 5) {
      return (
        <div className="dark-dash">
          <div className="survey-container">
            <div>Thank you</div>
            <section className="next-back">
              <button onClick={this.beginAgain}>New Entry</button>

              <button className="next-back"  onClick={this.start}>Done</button>
            </section>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  { completeSurvey, addToJournal }
)(Survey);
