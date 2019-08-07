import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom";
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
    if (!this.props.user.loggedIn) return <Redirect to="/login" />;
    return (
      <div>
        <section className="fill-in-white-1" ></section>
        <Header />
        <section className="fill-in-white" ></section>
        <div className="full-graph-health">
          {this.props.graphInfo[0] ? (
            <section className="my-chart-holder">
              <MyChart />
            </section>
          ) : (
            <div id="loader-wrapper">
              <div id="loader" />
            </div>
          )}

          <div className="introduction-graph">{`Here is how you have felt recently ${
            this.props.user.first_name
          }`}</div>
        </div>
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
