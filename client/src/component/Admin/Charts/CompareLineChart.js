import React, { Component } from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];

class CompareLineChart extends Component {
  render () {
    return (
    	<LineChart width={600} height={300} data={this.props.data}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name" padding={{left: 30, right: 30}}/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       {this.props.range.map((element, i) =>
          <Line type="monotone" dataKey={element} stroke={colors[i%20]} activeDot={{r: 8}}/>
        )}
      </LineChart>
    );

  }
}

export default CompareLineChart;
