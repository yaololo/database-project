import React, { Component } from 'react';

class YearlyDatePicker extends Component {
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
          minLength="1000"
          maxLength="9999"
          value={this.state.value}
          onChange={this.inputValidation.bind(this)}
         />
      </div>
    )
  }
}

export default YearlyDatePicker;




// function validate(email, password) {
//   // true means invalid, so our conditions got reversed
//   return {
//     email: email.length === 0,
//     password: password.length === 0,
//   };
// }

// class SignUpForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',

//       touched: {
//         email: false,
//         password: false,
//       },
//     };
//   }

//   handleEmailChange = (evt) => {
//     this.setState({ email: evt.target.value });
//   }

//   handlePasswordChange = (evt) => {
//     this.setState({ password: evt.target.value });
//   }

//   handleBlur = (field) => (evt) => {
//     this.setState({
//       touched: { ...this.state.touched, [field]: true },
//     });
//   }

//   handleSubmit = (evt) => {
//     if (!this.canBeSubmitted()) {
//       evt.preventDefault();
//       return;
//     }
//     const { email, password } = this.state;
//     alert(`Signed up with email: ${email} password: ${password}`);
//   }

//   canBeSubmitted() {
//     const errors = validate(this.state.email, this.state.password);
//     const isDisabled = Object.keys(errors).some(x => errors[x]);
//     return !isDisabled;
//   }

//   render() {
//     const errors = validate(this.state.email, this.state.password);
//     const isDisabled = Object.keys(errors).some(x => errors[x]);

//     const shouldMarkError = (field) => {
//       const hasError = errors[field];
//       const shouldShow = this.state.touched[field];

//       return hasError ? shouldShow : false;
//     };

//     return (
//       <form onSubmit={this.handleSubmit}>
//         <input
//           className={shouldMarkError('email') ? "error" : ""}
//           type="text"
//           placeholder="Enter email"
//           value={this.state.email}
//           onChange={this.handleEmailChange}
//           onBlur={this.handleBlur('email')}
//         />
//         <input
//           className={shouldMarkError('password') ? "error" : ""}
//           type="password"
//           placeholder="Enter password"
//           value={this.state.password}
//           onChange={this.handlePasswordChange}
//           onBlur={this.handleBlur('password')}
//         />
//         <button disabled={isDisabled}>Sign up</button>
//       </form>
//     )
//   }
// }

// ReactDOM.render(<SignUpForm />, document.body);
