import React from "react";
import Button from "./Button";
import "../styles/ButtonList.scss"

function ListItem(props) {
  const text = props.text;
  const to = props.to;
  return (
    <li><Button to={to} text={text} /></li>
  )
}

function ButtonList(props) {
  const listItems = props.btns.map((btn, index)=>
  <ListItem key={`btn-${index}`} to={btn.to} text={btn.text} />
  );
  
  return (
    <ul className="btnList">
      {listItems}
    </ul>
  );
}

export default ButtonList