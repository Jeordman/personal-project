import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import { getUserGraph } from "../../ducks/userReducer";
import MyChart from "../MyChart/MyChart";
import "./graphHealth.css";
import axios from "axios";

class GraphHealth extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserGraph(this.props.user.id);
  }

  render() {
    // console.log('this state', this.state.graphInfo)
    console.log("graph info", this.props.graphInfo);
    return (
      <div className="full-graph-health">
        <Header />
        <div className="introduction-graph">{`Here is how you have felt recently ${
          this.props.user.first_name
        }`}</div>

        {this.props.graphInfo[0] ? (
          <section className="my-chart-holder">
            <MyChart />
          </section>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state)
  return {
    user: state.user.user,
    other: state,
    graphInfo: state.user.graphInfo
  };
}

export default connect(
  mapStateToProps,
  { getUserGraph }
)(GraphHealth);
