import React, { Component } from 'react';
import SalesReport from './SalesReport';
import ActiveUserLookUp from './ActiveUserLookUp';
import ProductSalesReport from './ProductSalesReport';

class AdminContent extends Component {
  constructor(props){
    super(props)
    this.state= { component: props.component}
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      component: nextProps.component
    })
  }

  render() {
    return this.props.component === 'sales-report' ? (
      <SalesReport/>
    ) : this.props.component === 'active-user' ? (
     <ActiveUserLookUp/>
    ) : this.props.component === 'product-sales' ? (
     <ProductSalesReport/>
    ) : <SalesReport/>;
  }
}

export default AdminContent;
