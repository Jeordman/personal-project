import React, { Component } from "react";
import { connect } from "react-redux";
import "./journalSelected.css";

class JournalSelected extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    console.log("journalstate", this.props.journalState);
    return (
      <section className="specific-entry">
        <section className="selected-date">{`${
          this.props.journalState.selectedDate
        }`}</section>
        <section className="selected-mood">{`I felt ${
          this.props.journalState.selectedMood
        }/10 this day`}</section>
        <section className="selected-note">
          {this.props.journalState.selectedNote}
        </section>
        {this.props.journalState.editing ? (
          <div>
            <textarea
              value={this.props.journalState.selectedNote} //what we are changing (on props) (the info)
              onChange={this.props.handleChange} //normal handle change
              name="selectedNote"
              className='edit-journal-text'
            />
          </div>
        ) : null}
        {this.props.journalState.editing ? (
          <div>
            <button onClick={this.props.saveChangesJournal}>
              save changes
            </button>
            <button onClick={this.props.cancel}>cancel </button>
          </div>
        ) : (
          <button onClick={this.props.edit}>Edit</button>
        )}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(
  mapStateToProps,
  {}
)(JournalSelected);
