import React, { useContext } from "react";
import { GameInfo } from "../utils/GameInfo";
import { Redirect } from "react-router-dom";

function Game(props) {
  let gameState = useContext(GameInfo);
  console.log(gameState.state.setup, gameState.state.gambit);
  return (
    <div>
      {!gameState.state.setup.finished && <Redirect to="/play/setup/" />}
    </div>
  );
}

export default Game;