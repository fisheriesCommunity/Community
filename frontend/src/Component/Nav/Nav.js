import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <div>
      <ul className="home-u1">
        <li className="home-11">
          <Link to="/Boats" className="home-a">
            <h1>Boats</h1>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/BoatRegistration" className="home-a">
            <h1>Boat Registration</h1>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/BoatDetails" className="home-a">
            <h1>Boats Details</h1>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/Schedule" className="home-a">
            <h1>Schedule</h1>
          </Link>
        </li>
        <li className="home-11">
          <Link to="/ScheduleDetails" className="home-a">
            <h1>Schedule Details</h1>
          </Link>
        </li>
        {/* Log in button aligned to the right */}
        <li className="home-login">
          <Link to="/login" className="home-a">
            <h1>Log in</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
