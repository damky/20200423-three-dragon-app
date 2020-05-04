import React from 'react';
import ReactDOM from 'react-dom';
import { StateProvider } from "./utils/GameInfo";
// import "normalize.css";
import "./utils/typography"
import * as serviceWorker from './serviceWorker';
// import { TypographyStyle, GoogleFont } from 'react-typography';
// import typography from './utils/typography';
import './index.scss';
import App from './App';

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

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  // <App/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
