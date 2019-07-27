import React, { Component } from "react";
import { connect } from 'react-redux'
import Header from '../Header/Header'
import { getUserGraph } from '../../ducks/userReducer'
import MyChart from "../MyChart/MyChart";
import './graphHealth.css'

class GraphHealth extends Component {
  constructor() {
    super();
    this.state = {
     
    };
  }

componentDidMount() {
  this.props.getUserGraph(this.props.user.id)
}

  render() {
    // console.log('this state', this.state.graphInfo)
      console.log('props', this.props)
    return (
    <div>
        <Header />
        <div>{`Graph for ${this.props.user.first_name} ${this.props.user.last_name} id: ${this.props.user.id}`}</div>

        {
          this.props.graphInfo[0] ? (
            <section className='my-chart-holder'>
            < MyChart/>
            </section>
          ) : (
            null
          )
        }
       
    </div>)
    
  }
}

function mapStateToProps(state) { 
  // console.log('state', state)
  return { user : state.user.user, other: state, graphInfo: state.user.graphInfo};
}

export default connect(
  mapStateToProps,
  { getUserGraph }
)(GraphHealth);
