import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <ul className="home-ul">
        <li classname="home-ll">
          <Link to="/mainhome" className="active home-a">
            <h1>Home</h1>
          </Link>
        </li>

        <li classname="home-ll">
          <Link to="/addstock" className="active home-a">
            <h1>Stock Details</h1>
          </Link>
        </li>

        <li clasname="home-ll">
          <Link to="/AddNewStock" className="active home-a">
            <h1>Add New Stock</h1>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
