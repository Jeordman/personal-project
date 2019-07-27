import React, { Component } from "react";
import Chart from "chart.js";
import { connect } from "react-redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getUserGraph } from "../../ducks/userReducer";
import "./myChart.css";

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
            backgroundColor: "rgba(34, 167, 240, .5)",
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
      <section className="chart-day-mood">
        CHART COMPONENT
        <Line
          className="chart-day-mood"
          options={{
            responsive: true,
            animation: {
              duration: 3500 // general animation time
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    steps: 10,
                    stepSize: 1,
                    max: 10
                  }
                }
              ]
            }
          }}
          data={this.state.data}
        />
      </section>
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
