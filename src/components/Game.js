import React, { useContext } from "react";
// import { Consumer } from "../utils/context";
import { Redirect } from "react-router-dom";
import { StoreContext } from "..";



function Game(props) {
  // const gameDispatch = useContext(gameContext);
  const gameState = useContext(StoreContext);
  console.log(gameState.state.setup, gameState.state.gambit);
  return (
    <div>
      {!props.state.setup.finished && <Redirect to="/play/setup/" />}
    </div>
  );
}

export default Game;