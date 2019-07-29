import React, { Component } from "react";
import { connect } from "react-redux";

class JournalSelected extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    console.log("journalstate", this.props.journalState);
    return (
      <section className="specific-entry">
        {this.props.journalState.editing ? (
          <div>
            <textarea
              value={this.props.journalState.selectedNote} //what we are changing (on props) (the info)
              onChange={this.props.handleChange} //normal handle change
              name="selectedNote"
            />
          </div>
        ) : null}
        {this.props.journalState.editing ? (
          <div>
            <button
              onClick={this.props.saveChangesJournal}
            >
              save changes
            </button>
            <button onClick={this.props.cancel}>cancel </button>
          </div>
        ) : (
          <button onClick={this.props.edit}>Edit</button>
        )}
        {`${this.props.journalState.selectedDate} ${
          this.props.journalState.selectedMood
        } ${this.props.journalState.selectedNote}`}
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
