import React, { createContext } from "react";
import ReactDOM from "react-dom";
// import {Provider} from "./utils/context";
// import "normalize.css";
import "./utils/typography";
import * as serviceWorker from "./serviceWorker";
// import { TypographyStyle, GoogleFont } from 'react-typography';
// import typography from './utils/typography';
import "./index.scss";
import App from "./App";
import { GameProvider } from "./utils/GameInfo";

// class HeadChildren extends React.Component {
//   render() {
//     return (ReactDOM.createPortal(
//       <React.Fragment>
//         <TypographyStyle typography={typography} />
//         <GoogleFont typography={typography} />
//       </React.Fragment>,
//       document.getElementsByTagName('head')[0]
//     ))
//   }
// }
const StoreContext = createContext({});

class Store extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setup: {
        step: 1,
        finished: false,
        playersCount: 2,
      },
      gambit: {
        players: {},
        stakes: 0,
        allDragons: [],
        strongestFlightWins: true,
      },
    };
  }

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        <GameProvider>
          <App />
        </GameProvider>
      </StoreContext.Provider>
    );
  }
}

export default Store;

export { StoreContext };

ReactDOM.render(<Store />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
