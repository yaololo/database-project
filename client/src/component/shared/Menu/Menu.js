import React, { Component } from 'react';
import './Menu.css';
import { Link, Route } from 'react-router-dom';
import DigitalElectronic from '../../DigitalElectronic/DigitalElectronic';
import HomeLiving from '../../HomeLiving/HomeLiving';
import MenSports from '../../MenSports/MenSports';
import Home from '../Home/Home';
class Menu extends Component {
  constructor(props) {
    super();
    this.data = props.data;
  }

  render() {
    return (
      <div>
        <div className="nav_bar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/DigitalElectronic">Digital Electronic</Link>
            </li>
            <li>
              <Link to="/HomeLiving">Music</Link>
            </li>
            <li>
              <Link to="/MenSports">Men Sports</Link>
            </li>
          </ul>
        </div>
        <Route path="/" exact render={() => <Home data={this.props.data} />} />
        <Route path="/HomeLiving" exact render={() => <HomeLiving />} />
        <Route path="/MenSports" exact component={MenSports} />
        <Route
          path="/DigitalElectronic"
          exact
          render={() => <DigitalElectronic />}
        />
      </div>
    );
  }
}

export default Menu;
