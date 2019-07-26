import React, { Component } from 'react'
import Chart from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2'


class Charts extends Component {
constructor(){
    super()

    this.state = {

         dat : [
            {
                date: "Jan1",
                mood: 9
            },
            {
                date: "Jan2",
                mood: 6
            },
            {
                date: "Jan3",
                mood:8
            },
            {
                date: "Jan4",
                mood: 9
            },
            {
                date: "Jan5",
                mood: 5
            },
            {
                date: "Jan6",
                mood: 4
            },
            {
                date: "Jan7",
                mood: 3
            },
            {
                date: "Jan8",
                mood: 9
            },
            {
                date: "Jan9",
                mood: 10
            },
            {
                date: "Jan10",
                mood: 7
            },
        ],

        data: {
           
            labels: ['1','2','3','4','5','6','7','8', '9','10'],
            datasets: [
                {
                    label: 'Mood',
                    backgroundColor: 'rgba(0, 255, 2, .75)',
                    data: [2,3,2,5,5,8,8,9,6,3]
                }
            ]
        }
    }
}

mapi = (data) => {
    let dates = data.map(x => x.date)
    console.log('dates', dates)   
    return dates 
  }

mood = (data) => {
    let mood = data.map(x => x.mood)
    console.log('mood', mood)
    return mood
}

    render(){
console.log(this.mapi(this.state.dat))
console.log(this.mood(this.state.dat))
        return (
            <div style={{position: 'relative', width: 600, height: 550}} className='chart'>
                CHART COMPONENT
                <Line
                options={{
                    responsive:true
                }}
                data={this.state.data}
                />
            </div>
        )
    }
}

export default Charts