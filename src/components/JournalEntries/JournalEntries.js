import React, { Component } from "react";

class JournalEntries extends Component {
  render() {
    const { date, entry_id, mood, note, user_id } = this.props.obj;
    console.log('dis d id ', entry_id)
    return (
      <section>
        <div>{`date ${date} entry id${entry_id} mood ${mood} note ${note} userid${user_id}`}</div>
        <button className="link-button"
        onClick={() => this.props.chooseEntry(entry_id)} >
          <i className="fa fa-external-link fa-sp" />
        </button>
      </section>
    );
  }
}

export default JournalEntries;
