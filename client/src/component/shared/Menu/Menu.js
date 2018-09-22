import React, { Component } from 'react';
import './Menu.css';
import { Link, Route } from 'react-router-dom';
import DigitalElectronic from '../../DigitalElectronic/DigitalElectronic';
import HomeLiving from '../../HomeLiving/HomeLiving';
import MenSports from '../../MenSports/MenSports';

class Menu extends Component {
  render() {
    return (
      <div>
        <div id="nav_bar">
          <ul>
            <li>
              <Link to="/DigitalElectronic">DigitalElectronic</Link>
            </li>
            <li>
              <Link to="/HomeLiving">HomeLiving</Link>
            </li>
            <li>
              <Link to="/MenSports">Men Sports</Link>
            </li>
          </ul>
        </div>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/HomeLiving" exact render={() => <HomeLiving />} />
        <Route path="/MenSports" exact component={MenSports} />
        {/* {/* <Route path="/take_away" exact render={() => <DeliveryParentPage />} /> */}
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
