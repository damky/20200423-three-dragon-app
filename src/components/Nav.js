import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Nav.scss";

function Nav() {
  return (
    <nav className='Nav'>
      <ul>
        <li>
          <NavLink to="/" className="logo" >Three Dragons</NavLink>
        </li>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/play/setup">Setup</NavLink>
        </li>
        <li>
          <NavLink to="/rules">Rules</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Nav