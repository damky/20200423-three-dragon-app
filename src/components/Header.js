import React from "react";
import Nav from "./Nav";
import ReactDOM from "react-dom";
import { useRouteMatch } from "react-router-dom";
import "../styles/Header.scss";
import {UnBkg} from "./Unsplash";

function Header(props){  
  // const location = useLocation();
  const match = useRouteMatch("/");
  const dragon = 'p1iT_xfrRkQ';
  
  ReactDOM.render(
  <React.Fragment>Three Dragons{!match.isExact && ` | ${props.title}`}</React.Fragment>,document.querySelector('head title')
  )

  return (
    <React.Fragment>
      <header>
        <Nav/>
        <UnBkg className="titleBox" photoId={dragon} wXh="600" overlay={{padding:props.titlePadding}}>
          <h1>{props.title}</h1>
        </UnBkg>
      </header>
    </React.Fragment>
  )
}

export default Header;