import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
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
