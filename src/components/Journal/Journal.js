import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
import { getUserJournal, editUserJournal } from "../../ducks/journalReducer";
import JournalEntries from "../JournalEntries/JournalEntries";
import JournalSelected from "../JournalSelected/JournalSelected";
import "./journal.css";

class Journal extends Component {
  constructor() {
    super();

    this.state = {
      selectedEntry: -1,
      selectedDate: "",
      selectedMood: 0,
      selectedNote: "",
      editing: false
    };
  }

  componentDidMount() {
    this.props.getUserJournal(this.props.user.id);
  }

  componentDidUpdate(prevProps) {
    
    if (this.props.user && prevProps !== this.props) {
      this.setState({
        selectedEntry: this.props.journalEntries[0].entry_id,
        selectedDate: this.props.journalEntries[0].date,
        selectedMood: this.props.journalEntries[0].mood,
        selectedNote: this.props.journalEntries[0].note
      });
    }
  }

  chooseEntry = id => {
    this.setState({
      selectedEntry: id,
      selectedDate: this.props.journalEntries.find(item => item.entry_id === id)
        .date,
      selectedMood: this.props.journalEntries.find(item => item.entry_id === id)
        .mood,
      selectedNote: this.props.journalEntries.find(item => item.entry_id === id)
        .note
    });
  };

  edit = () => {
    this.setState({ editing: true });
  };

  saveChangesJournal = () => {
    const { selectedEntry, selectedNote } = this.state;
    console.log(
      "select entry, userid, selected note",
      selectedEntry,
      this.props.user.id,
      selectedNote
    );
    this.props.editUserJournal(selectedEntry, this.props.user.id, selectedNote);
    this.setState({ editing: false });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  cancel = () => {
    this.setState({ editing: false });
    this.setState({
      selectedNote: this.props.journalEntries.find(
        item => item.entry_id === this.state.selectedEntry
      ).note
    });
  };

  render() {
    console.log("journal props", this.props);
    console.log("state", this.state);
    if (!this.props.user.loggedIn) return <Redirect to="/login" />;
    if (this.props.journalEntries[0]) {
      return (
        <div className="journal-holder-component">
          <Header />

          <JournalSelected
            journalState={this.state}
            edit={this.edit}
            saveChangesJournal={this.saveChangesJournal}
            handleChange={this.handleChange}
            cancel={this.cancel}
          />

          <section className="repeating">
            {this.props.journalEntries.map(obj => {
              return (
                <div>
                  <JournalEntries obj={obj} chooseEntry={this.chooseEntry} />
                </div>
              );
            })}
          </section>
        </div>
      );
    } else {
      return (
        <div id="loader-wrapper">
          <div id="loader" />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    journalEntries: state.journal.journalEntries
  };
}

export default connect(
  mapStateToProps,
  { getUserJournal, editUserJournal }
)(Journal);
