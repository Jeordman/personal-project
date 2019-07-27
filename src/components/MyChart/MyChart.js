import React, { Component } from "react";
import Chart from "chart.js";
import { connect } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getUserGraph } from "../../ducks/userReducer";
import "./myChart.css";
import { async } from "q";

class MyChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      moods: [],

      data: {
        labels: props.graphInfo.map(obj => obj.date),
        datasets: [
          {
            label: "Mood",
            backgroundColor: "rgba(0, 255, 2, .75)",
            data: props.graphInfo.map(obj => obj.mood)
          }
        ]
      }
    };
  }

  // mapi = (data) => {
  //     let dates = data.map(x => x.date)
  //     console.log('dates', dates)
  //     return dates
  //   }

  // mood = (data) => {
  //     let mood = data.map(x => x.mood)
  //     console.log('mood', mood)
  //     return mood
  // }

//   componentDidMount = () => {
//     let dateArr = 
//     let moodArr = ;
//     this.setState({
//       data: {
//         ...this.state.data,
//         labels: dateArr,
//         datasets: [{ ...this.state.data.datasets[0], data: moodArr }]
//       }
//     });
//   };

  render() {
    return (
      <div className="chart">
        CHART COMPONENT
        <Line
          options={{
            responsive: true
          }}
          data={this.state.data}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state)
  return { user: state.user.user, graphInfo: state.user.graphInfo };
}

export default connect(
  mapStateToProps,
  { getUserGraph }
)(MyChart);
