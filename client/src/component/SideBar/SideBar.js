import React, { Component } from 'react';
import Select from 'react-select';
import './Sidebar.css'
import { ProviderContext, subscribe } from "react-contextual";
import { withRouter } from "react-router";

import {
  mapSessionContextToProps,
  sessionContextPropType,
  sessionCartInfoPropType,
  mapItemsToCart,
  mapMessageContextToProps,
  messageContextPropType,
} from "../../context_helper"

const options = [
  { value: '3', label: 'Clothing' },
  { value: '4', label: 'Sports' },
  { value: '5', label: 'Music' },
  { value: '6', label: 'Furniture' },
  { value: '9', label: 'Bags' },
  { value: '10', label: 'Logo' }
];

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

class SideBar extends Component {
  static propTypes = {
    // history: object.isRequired,
    // cookies: instanceOf(Cookies).isRequired,
    ...sessionContextPropType,
    ...sessionCartInfoPropType,
    ...messageContextPropType
  };

  constructor(){
    super();
    this.state= {
      selectedOption: null,
    }
  }

  onClickHandler = (e) => {
    fetch('/api/search_by_price', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categories: this.state.selectedOption,
        orderBy: e.target.name
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.props.history.push({
            pathname:`/search_product`,
            state:{
              data: json.data
             }
           });
        })
      } else {
        response.json().then(json => {
          console.log(json.msg)
        })
      }
    });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // console.log(`Option selected:`, selectedOption);
  }

  render() {
    return (
      <div className="search-bar-fix">
        <div className="search-icon">
          <Select
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={options}
            isMulti={true}
            isSearchable={true}
            formatGroupLabel={formatGroupLabel}
            placeholder={'Select product category'}
          />
          </div>
          <div>
            <button type="submit" className="dropdown btn btn-primary" data-cy="profile">
              <li
                href="about:blank"
                data-toggle="dropdown"
                className="navbar-avatar dropdown-toggle search-dropdown"
              >
                Search By
                <i className="caret" />
              </li>
              <ul className="dropdown-menu">
                <li onClick={this.onClickHandler.bind(this)}>
                  <a name="ASC" >Lowest to Highest price</a>
                </li>
                <li className="divider" />
                <li  onClick={this.onClickHandler.bind(this)}>
                  <a name="DESC">
                    Highest to Highest price
                  </a>
                </li>
              </ul>
            </button>
          </div>
      </div>
    )
  }
}

const mapContextToProps = context => {
  return {
    ...mapSessionContextToProps(context),
    ...mapItemsToCart(context),
    ...mapMessageContextToProps(context)
  };
};

export default subscribe(ProviderContext, mapContextToProps)(
  withRouter(SideBar)
);
