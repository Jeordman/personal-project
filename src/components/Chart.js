import React, { Component } from 'react'
import Chart from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2'


class Charts extends Component {
constructor(){

    super()

    this.state = {
        data: {
            labels: ['1','2','4','5'],
            datasets: [
                {
                    label: 'videos',
                    backgroundColor: 'rgba(0, 255, 255, .75)',
                    data: [4, 5, 1, 10, 32, 2, 12]
                },
                {
                    label: 'subs',
                    backgroundColor: 'rgba(0, 255, 255, .75)',
                    data: [14, 15, 11, 110, 3, 21, 6]
                }
            ]
        }
    }
}
    render(){
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