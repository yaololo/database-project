import React, { Component } from 'react';

class MonthlyDatePicker extends Component {
  constructor(props) {
    super(props),
    this.defaultValue = new Date().getFullYear();
    this.state = {
      value: this.defaultValue,
      className: ''
     }
  }
  inputValidation(e){
    if(e.target.value.length <= 4){
      this.setState({
        value: e.target.value,
        className: this.validate(e.target.value)
       });
      this.props.onChange(e);
    }
  }

  validate(value){
    if(value.length < 4) return 'error'
  }

  render() {
    return (
      <div>
        <input type="number"
          className= {this.state.className}
          min="1000"
          max="9999"
          value={this.state.value}
          onChange={this.inputValidation.bind(this)}
         />
      </div>
    )
  }
}

export default MonthlyDatePicker;
