import React, { Component } from 'react';
import Select from 'react-select';
import './Sidebar.css'
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
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

  constructor(){
    super();
    this.state= {
      selectedOption: null,
    }
  }



  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
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
                <li>
                  <a>Lowest to Highest price</a>
                </li>
                <li className="divider" />
                <li>
                  <a >
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

export default SideBar;
