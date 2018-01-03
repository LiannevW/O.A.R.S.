import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';

class MyChart extends Component {

  render() {
    return (
      <div>
        <LineChart
              hidePoints ="true"
              xLabel = "time in mins"
              yLabel = "velocity"
              width={1000}
              height={400}
              data={this.props.chartData}
          />
      </div>
    );
  }
}

MyChart.defaultProps = {
    zoom: 11,
    chartData:[{
        color: "#090909",
        points: [{x:5,y:10}, {x:6,y:3}]
      }]
}
export default MyChart
