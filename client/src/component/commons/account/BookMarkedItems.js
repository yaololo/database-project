import React, { Component } from 'react';

class BookMarkedItems extends Component {
  constructor(){
    super();
    this.state={
      data:[]
    }
  }

  componentWillMount() {
    fetch('/api/book_mark_item', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            data: json.data
          });
        });
      } else {
        response.json().then(json =>
          console.log('app crash')
        //  this.setErrorMessages(json.msg)
        );
      }
    });
  }

  render() {
    return (
      <div>
         <div className="order-details">
          <div></div>
          <div>Product Name</div>
          <div>Price</div>
         </div>
         {}
      </div>
    );
  }
}

export default BookMarkedItems;
