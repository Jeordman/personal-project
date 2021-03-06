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
            backgroundColor: "rgba(255,176,8, .7)",
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

  componentDidUpdate(prevProps) {
    console.log("hitcompupdate");
    if (prevProps !== this.props) {
      console.log("updated", this.props);
      this.setState({
        data: {
          labels: this.props.graphInfo.map(obj => obj.date),
          datasets: [
            {
              label: "Mood",
              backgroundColor: "rgba(62,167,241, .4)",
              data: this.props.graphInfo.map(obj => obj.mood)
            }
          ]
        }
      });
    }
  }

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
    console.log("graph info my chart", this.props.graphInfo);
    console.log("state label", this.state.data);
    return (
      <section className="chart-day-mood">
        <Line
          className="chart-day-mood"
          options={{
            responsive: true,
            animation: {
              duration: 3500 // general animation time
            },
            legend: {
              labels: {
                // This more specific font property overrides the global property
                fontColor: "black"
              }
            },
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: false,
                    beginAtZero: true,
                    steps: 10,
                    stepSize: 1,
                    max: 10,
                    fontColor: "black",
                    fontSize: 15
                  }
                }
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 17,
                    fontColor: "black",
                    fontSize: 15
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
