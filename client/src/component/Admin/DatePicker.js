import React, { Component } from 'react';
import CustomizeDatePicker from './DatePicker/CustomizeDatePicker';
import YearlyDatePicker from './DatePicker/YearlyDatePicker';
import MonthlyDatePicker from './DatePicker/MonthlyDatePicker';

class DatePicker extends Component {
  render() {
    return this.props.type === 'Yearly' ? (
      <YearlyDatePicker onChange={this.props.onChange}/>
    ) : this.props.type === 'Monthly' ? (
     <MonthlyDatePicker onChange={this.props.onChange}/>
    ) : this.props.type === 'Customize' ? (
     <CustomizeDatePicker onChange={this.props.onChange}/>
    ) : <YearlyDatePicker onChange={this.props.onChange}/>;
  }
}

export default DatePicker;
