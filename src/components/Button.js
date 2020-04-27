import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button.scss";

function Button(props) {
  return <Link className="btn" to={props.to}>{props.text}</Link>
}

export default Button;
