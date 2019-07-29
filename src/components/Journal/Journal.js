import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import { getUserJournal } from '../../ducks/journalReducer'

class Journal extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.getUserJournal(this.props.user.id)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Header />
        <section className='top'></section>
      </div>
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
  { getUserJournal }
)(Journal);
