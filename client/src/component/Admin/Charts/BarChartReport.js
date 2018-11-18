
import {BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Cell} from "recharts";
import React, { Component } from 'react';

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
class BarChartReport extends Component {
  constructor(props) {
    super(props);
    this.state= {
      data: []
    }
  }

  render() {
    if( this.props.data !== []){
      return (
        this.props.type === 'Customize' ?
        <div>
          <BarChart width={800} height={400} data={this.props.data}
            margin={{top: 10, right: 50, left: 50, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis>
              <Label value="Revenue($)"  offset={-15} angle={-90} position="insideLeft" textAnchor='middle'/>
            </YAxis >
            <Tooltip/>
            <Legend />
            {this.props.range.map((element, i) =>
              <Bar dataKey={element} fill={colors[i%20]} >
              </Bar>
              )
            }
          </BarChart>
        </div> : <BarChart width={800} height={400} data={this.props.data}
            margin={{top: 10, right: 50, left: 50, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis>
              <Label value="Revenue($)"  offset={-15} angle={-90} position="insideLeft" textAnchor='middle'/>
            </YAxis >
            <Tooltip/>
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" >
              <LabelList dataKey="sales" position="top" />
            </Bar>
          </BarChart>
      );
    }else {
      return <div>No Data</div>
    }
  }
}

export default BarChartReport;
