import React from "react";
import Header from "./Header";
import CenterBlock from "./CenterBlock";

function Layout(props) {
  return (
    <React.Fragment>
      <Header title={props.title}/>
      <main><CenterBlock>{props.children}</CenterBlock></main>
    </React.Fragment>
  );
}

export default Layout