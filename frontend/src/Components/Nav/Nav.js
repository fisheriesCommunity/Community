import React from "react";
import "./Nav.css";
import "./nav.css";
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
      <ul className="loan-ul">
        <li className="loan-ll">
            <Link to="/mainloan" className="active loan-a">
          <h1>Loan</h1>
          </Link>
        </li>
        <li className="loan-ll">
        <Link to="/addrequest" className="active loan-a">
          <h1>AddRequest</h1>
          </Link>
        </li>
        <li className="loan-ll">
        <Link to="/requestdetails" className="active loan-a">
          <h1>RequestsDetails</h1>
          </Link>
        </li>
        <li className="loan-ll">
          <Link to="/contact" className="active loan-a">
          <h1>ContactAdmin</h1>
          </Link>
        </li>
        <li className="loan-ll">
          <Link to="/upload" className="active loan-a">
          <h1>UploadCollateral</h1>
          </Link>
        </li>
        <li className="loan-ll">
        <Link to="/regi" className="active loan-a">
          <button>Register</button>
          </Link>
        </li>
        <li className="loan-ll">
          <Link to="/log" className="active loan-a">
          <button>Login</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
