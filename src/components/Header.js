import React from "react";
import Nav from "./Nav";
// import ReactDOM from "react-dom";
import { useRouteMatch } from "react-router-dom";
import "../styles/Header.scss";
import { UnBkg } from "./Unsplash";

function Header(props) {
  // const location = useLocation();
  const match = useRouteMatch("/");
  const dragon = "p1iT_xfrRkQ";

  document.title = match.isExact ? "3 Dragons" : `3 Dragons | ${props.title}`;

  return (
    <React.Fragment>
      <header>
        <Nav />
        <UnBkg
          className="titleBox"
          photoId={dragon}
          wXh="600"
          overlay={{ padding: props.titlePadding, maxHeight: "100px" }}
        >
          <h1>{props.title}</h1>
        </UnBkg>
      </header>
    </React.Fragment>
  );
}

export default Header;
