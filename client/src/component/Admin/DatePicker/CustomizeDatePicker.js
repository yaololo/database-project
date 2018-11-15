import React, { Component } from 'react';

class CustomizeDatePicker extends Component {
  constructor(props) {
    super(props),
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth()
    this.state = {
      value: `${this.year}-${this.month}`,
      className: ''
     }
  }

  inputValidation(e){
    this.setState({
      value: e.target.value,
      className: this.validate(e.target.value)
      });
    this.props.onChange(e);
  }

  validate(value){
    if(value.length < 4) return 'error'
  }

  render() {
    return (
      <div>
        <input type="month"
          className= {this.state.className}
          min="2000-01"
          max="9999-12"
          onChange={this.inputValidation.bind(this)}
        />
    </div>
    );
  }
}

export default CustomizeDatePicker;
