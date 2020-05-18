import React, { useContext } from "react";
// import { Consumer } from "../utils/context";
import { Redirect } from "react-router-dom";
// import { StoreContext } from "..";
import {GameContext} from "../utils/GameInfo";




function Game(props) {
  const gameDispatch = useContext(GameContext);
  const {state} = gameDispatch;
  console.log(state, state.gambit.players);
  
  
  const Player = (props) => {
    return (
      <React.Fragment>
        <h3>{props.name}</h3>
        <p><b>Hoard:</b> {props.hoard}</p>
      </React.Fragment>
    );
  }
  const players = Object.values(state.gambit.players).map((player)=><Player key={`${player.name}-key`} name={player.name} hoard={player.hoard} />);

  const PlayRound = () => {
    return (
      <div></div>
    )
  };
  return (
    <div>
      {!state.setup.finished && <Redirect to="/play/setup/" />}
      {players}
      <PlayRound />
    </div>
  );
}

export default Game;