import React, { useContext } from "react";
import ReactDOM from "react-dom";
// import { Consumer } from "../utils/context";
import { Redirect } from "react-router-dom";
// import { StoreContext } from "..";
import {GameContext} from "../utils/GameInfo";




function Game(props) {
  const gameDispatch = useContext(GameContext);
  const {state, dispatch} = gameDispatch;
  console.log(state, state.gambit.players);

  
  const Player = (props) => {
    return (
      <div className="player" id={props.id}>
        <h3>{props.name}</h3>
        <p className="hoard"><b>Hoard:</b> {props.hoard}</p>
        <p className="ante"><b>Ante:</b> {props.ante}</p>
      </div>
    );
  };

  const players = Object.values(state.gambit.players).map((player)=><Player key={`${player.name}-key`} id={player.player} name={player.name} hoard={player.hoard} ante={player.ante} />);

  const PlayRound = () => {
    const startGambit = async () => {
      // each player ante
      await dispatch({type: "ANTE_UP"});
      players.forEach((player, i)=>{
        ReactDOM.render(<React.Fragment><b>Ante:</b> {state.gambit.players[`Player${i+1}`].ante}</React.Fragment>,document.querySelector(`#Player${i+1} p.ante`));
      });
    };
    return (
      <div><button onClick={startGambit}>Start Gambit</button></div>
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