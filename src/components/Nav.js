import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.scss";

function Nav() {
  return (
    <nav className='Nav'>
      <ul>
        <li>
          <Link to="/" className="logo" >Three Dragons</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/play/setup">Setup</Link>
        </li>
        <li>
          <Link to="/rules">Rules</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav