import React, { Component } from 'react';
import BookMarkedItems from './BookMarkedItems';
import Account from './Account';
import HistoricalOrders from './HistoricalOrders';
class ProfileContent extends Component {
  constructor(props){
    super(props)
    this.state= { component: props.component}
  }

  componentWillReceiveProps(nextProps){
    console.log('updated by did mount')
    this.setState({
      component: nextProps.component
    })
  }
  render() {
    return this.props.component === 'bookmarks' ? (
      <BookMarkedItems/>
    ) : this.props.component === 'orders' ? (
     <HistoricalOrders/>
    ) : this.props.component === 'account' ? (
     <Account/>
    ) : <Account/>;
  }
}

export default ProfileContent;
