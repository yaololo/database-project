
import {BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Cell} from "recharts";
import React, { Component } from 'react';
const data = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];


class BarChartReport extends Component {
  constructor(props) {
    super(props);
    this.state= {
      data: []
    }
  }
  renderBars(type){
    return type == 'Customize'? (this.props.range.map((element, i) =>{
      console.log(element);
          <Bar dataKey={element} fill={colors[i%20]}>
            <LabelList dataKey={element} position="top" />
          </Bar>
         })) : ( <Bar dataKey="sales" fill="#82ca9d" >
         <LabelList dataKey="sales" position="top" />
       </Bar>)
  }

  render() {
    console.log(this.props.data)
    if( this.props.data !== undefined){
      return (
        this.props.type === 'Customize' ?
        <div>
          <BarChart width={800} height={400} data={this.props.data}
            margin={{top: 5, right: 50, left: 50, bottom: 5}}>
            {/* <CartesianGrid strokeDasharray="5 5"/> */}
            <XAxis dataKey="name"/>
            <YAxis>
              <Label value="Revenue($)"  offset={-15} angle="-90" position="insideLeft" textAnchor='middle'/>
            </YAxis >
            <Tooltip/>
            <Legend />
            {this.props.range.map((element, i) =>
              <Bar dataKey={element} fill={colors[i%20]} >
                <LabelList dataKey={element} position="top" />
              </Bar>
              )
            }
          </BarChart>
        </div> : <BarChart width={800} height={400} data={this.props.data}
            margin={{top: 5, right: 50, left: 50, bottom: 5}}>
            {/* <CartesianGrid strokeDasharray="5 5"/> */}
            <XAxis dataKey="name"/>
            <YAxis>
              <Label value="Revenue($)"  offset={-15} angle="-90" position="insideLeft" textAnchor='middle'/>
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
