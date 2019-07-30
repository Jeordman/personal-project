import React, { Component } from "react";
import "./journalEntries.css";

class JournalEntries extends Component {
  render() {
    const { date, entry_id, mood, note, user_id } = this.props.obj;
    console.log("dis d id ", entry_id);
    return (
      <section className="repeating-days">
        <article className="repeating-date">{`DATE:  ${date}`}</article>
        <article className="repeating-mood">{`${mood}/10`}</article>
        <button
          className="link-button"
          onClick={() => this.props.chooseEntry(entry_id)}
        >
          <i className="fa fa-external-link fa-sp" />
        </button>
      </section>
    );
  }
}

export default JournalEntries;
