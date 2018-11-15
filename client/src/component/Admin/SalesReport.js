import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import BarChartReport from './Charts/BarChartReport';
import DatePicker from './DatePicker';
class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date().getFullYear(),
      endDate: new Date().getFullYear(),
      datePickerType: 'Yearly',
      customizeData: [],
      submitButtonClass: '',
    };
    this.yearRange = 0;
  }

  changeReportType(e){
    e.preventDefault();
    this.setState({
      datePickerType: e.target.name,
      startDate: new Date().getFullYear(),
      endDate: new Date().getFullYear(),
    })

  }

  generateReport(e){

    let startDate = "";
    let endDate = "";
    if(this.state.datePickerType === "Yearly"){
      startDate = `${this.state.startDate}-01-01`
      endDate = `${this.state.endDate}-12-31`
    } else if(this.state.datePickerType === "Monthly") {
      startDate = `${this.state.startDate}-01-01`
      endDate = `${this.state.startDate}-12-31`
    } else{
      let year = this.state.endDate.split("-")[0];
      let month = this.state.endDate.split("-")[1];
      let lastDay = new Date(year, month, 0).getDate();
      startDate = `${this.state.startDate}-01`;
      endDate = `${this.state.endDate}-${lastDay}`
    }

    fetch('/api/sale_report_month_year', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
        reportType: this.state.datePickerType
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({ monthlyData: json.data })
        })
      } else {
        response.json().then(json => {
          console.log(json.msg)
        })
      }
    });
  }


  startDateChangeHandler(e) {
    this.setState({
      startDate: e.target.value,
      submitButtonClass: this.validate(e.target.value, this.state.endDate)
    });
  }

  endDateChangeHandler(e) {
    this.setState({
      endDate: e.target.value,
      submitButtonClass: this.validate(this.state.startDate, e.target.value)
    });
  }

  validate(start, end){
    if(this.state.datePickerType === "Yearly"){
      if(start.toString().length !==4 || end.toString().length!==4 ){
        return 'disable'
      } else if (Number(end) - Number(start) < 0){
        return 'disable'
      } else return ''
    } else if (this.state.datePickerType === "Customize"){

      if(typeof start === 'number' || typeof end === 'number') return 'disable';

      let startYear = start.split("-")[0];
      let endYear = end.split("-")[0];
      let startMonth = start.split("-")[1];
      let endMonth = end.split("-")[1];

      this.yearRange = []
      for(let i = Number(startYear); i <= Number(endYear); i++){
        this.yearRange.push(i);
      }

      if(Number(startYear) > Number(endYear)){
        return 'disable'
      }else if(Number(startYear) == Number(endYear)){
        if(Number(startMonth) > Number(endMonth)) return 'disable'
      }else return ''
    } else{
      return ''
    }
  }

  renderEndDate(type){
    if(type !== 'Monthly'){
      return(
        <div>Ending Date:
        <DatePicker
            type={this.state.datePickerType}
            onChange={this.endDateChangeHandler.bind(this)}
          />
        </div>
      )
    }else{
      return <div></div>
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-static-top">
            <div className="admin-nav-div">
              <div className="report-title">
              Report type:
                <button type="submit" className="dropdown report-type" data-cy="profile">
                   <li
                      href="about:blank"
                      data-toggle="dropdown"
                      className="navbar-avatar dropdown-toggle search-dropdown"
                    >
                      {this.state.datePickerType}
                      <i className="caret" />
                    </li>
                    <ul className="dropdown-menu">
                      <li onClick={this.changeReportType.bind(this)}>
                        <a name="Yearly" >Yearly</a>
                      </li>
                        <li className="divider" />
                        <li  onClick={this.changeReportType.bind(this)}>
                          <a name="Monthly">
                            Monthly
                          </a>
                        </li >
                      <li className="divider" />
                        <li  onClick={this.changeReportType.bind(this)}>
                            <a name="Customize">
                              Customize
                            </a>
                        </li >
                    </ul>
                </button>
              </div>
              <div className="admin-nav-layout">
                <div>{this.state.datePickerType === "Monthly" ? "Enter Year:" : "Starting Date:"}
                <DatePicker
                    type={this.state.datePickerType}
                    onChange={this.startDateChangeHandler.bind(this)}
                  />
                </div>
                  {this.renderEndDate(this.state.datePickerType)}
                  <div className="generate-report">
                    <button type="submit"
                    disabled= {this.state.submitButtonClass}
                    className="dropdown btn btn-primary"
                    data-cy="profile"
                    disabled= {this.state.submitButtonClass}
                    onClick={this.generateReport.bind(this)}
                    >
                      Generate
                    </button>
                  </div>
                </div>
          </div>
        </nav>
        <div className="report-charts">
          <div className="report-charts">
            <BarChartReport data={this.state.monthlyData} type={this.state.datePickerType} range={this.yearRange}/>
          </div>
        </div>
      </div>
    );
  }


}

export default SalesReport;
