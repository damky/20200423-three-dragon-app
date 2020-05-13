import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from "./utils/context";
// import "normalize.css";
import "./utils/typography"
import * as serviceWorker from './serviceWorker';
// import { TypographyStyle, GoogleFont } from 'react-typography';
// import typography from './utils/typography';
import './index.scss';
import App from './App';
import { GameProvider } from './utils/GameInfo';

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
    this.state =  {
      setup: {
        step: 1,
        finished: false,
        playersCount: 2
      },
      gambit: {
        players: {
          Player1: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player1",
            player: "Player1"
          },
          Player2: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player2",
            player: "Player2"
          },
          Player3: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player3",
            player: "Player3"
          },
          Player4: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player4",
            player: "Player4"
          },
          Player5: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player5",
            player: "Player5"
          },
          Player6: {
            hoard: 100,
            isReal: false,
            isRealGood: false,
            name: "Player6",
            player: "Player6"  
          },
        },
        stakes: 0
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

export {StoreContext}

ReactDOM.render(
  <Store/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
