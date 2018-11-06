import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-static-top">
            <div className="admin-nav-div">
              <div className="report-title">
                  <div>Select Date to generate Report</div>
              </div>
              <div className="admin-nav-layout">
                <div>Starting Date:
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                </div>
                <div>Ending Date:
                <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleChange}
                  />
                </div>
                  <div className="generate-report">
                    <button>Generate Report</button>
                  </div>
              </div>
            <div></div>
            <div id="navbar" className="navbar-collapse collapse">
            </div>
          </div>
        </nav>
        <div>
          content
        </div>
      </div>
    );
  }
}

export default SalesReport;
