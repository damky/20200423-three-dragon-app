import React, {useContext, useEffect, useState} from "react";
import { Switch, Route, Link } from "react-router-dom";
import SelectOption from "./SelectOption";
import { GameInfo } from "../utils/GameInfo";
// import ReactDOM from "react-dom";

const SetupForm = (props) => {

  // let matchStart = useRouteMatch("/play/setup/");
  // let matchEnd = useRouteMatch("/play/setup/8");

  const gameState = useContext(GameInfo);
  const { dispatch } = gameState;
  const step = gameState.state.setup.step;
  let curUrl = document.location.protocol + "//" + document.location.host + "/play/setup/" + step;
  console.log(curUrl);
  console.log(step);
  console.log(gameState);

  // const [finished, setFinished] = useState(false);

  // useEffect(() => {
  //   (matchEnd !== null) && dispatch({ type: 'TOGGLE_FINISHED'});
  // },[dispatch, matchEnd]);

  function Prev() {
    // function subtr(){dispatch({type:'SUBTRACT_STEP'})}
    function startOver() {
      dispatch({type: "START_OVER"})
      document.location = document.location.protocol + "//" + document.location.host + "/play/setup/"
    }
    return (
      <button onClick={startOver} className="btn">Start Over</button>
    )
  }

  function Next() {
    function add(){dispatch({type:'ADD_STEP'})}
    return (
      <button onClick={add} className="btn">Next</button>
    )
  }

  function PlayGame() {
    function toggleFinish() {
      dispatch({type:'TOGGLE_FINISHED'})
    }
    return (
      <Link onClick={toggleFinish} to="/play" className="btn">Play</Link>
    )
  }


  function Step1() {
    useEffect(()=>{
      createPlayers();
    });

    function createPlayers(c,count) {
      dispatch({type:"CLEAR_PLAYERS"});
      if (count === undefined) {count = gameState.state.setup.playersCount}
      if (c === undefined) {c = gameState.state.gambit.players.length}
      while (c < count) {
        dispatch({type:"NEW_PLAYER"});
        c++;
      }
    }
    return (
      <div>
        <label>
          <h4>OK. How many are playing?</h4> 
            <select 
              value={gameState.state.setup.playersCount} 
              onChange={(e) => {
                let count = e.target.value;
                dispatch({ type: `PLAYERS_COUNT_${count}`});
                createPlayers(e.target.value,gameState.state.setup.playersCount);
              }}>
              <SelectOption value={2} />
              <SelectOption value={3} />
              <SelectOption value={4} />
              <SelectOption value={5} />
              <SelectOption value={6} />
            </select>
        </label>
      </div>
    );
  }

  function Name(props) {
    return <><label>{props.label}<br/><input name={props.name} value={props.value} onChange={props.onChange} /></label><br/></>
  }
  
  function Step2() {  

    function handleChange(e) {
      console.log(e.target.name, playerName);
      setPlayerName(e.target.value);
    }
    
    // Array.from(this.players).map((player)=>console.log(player))
    const players = gameState.state.gambit.players;
    const [playerName, setPlayerName] = useState(players);
    const names = players.map( (player, iter) => <Name name={`player${iter}`} key={player.name+iter} label={`Player ${iter+1} name:`} value={players[iter].name} onChange={handleChange} /> );
    return (
      <React.Fragment>
        <h4>and what are the names of the real people who wanna roll their own dice?</h4>
          <div id="playersNames">
            {names}
          </div>
        
      </React.Fragment>
    );
  }

  function Step3() {
    return (
      <div>
        three
      </div>
    );
  }

  function Step4() {
    return (
      <div>
        four
      </div>
    );
  }

  function Step5() {
    return (
      <div>
        five
      </div>
    );
  }

  function Step6() {
    return (
      <div>
        six
      </div>
    );
  }

  function Step7() {
    return (
      <div>
        seven
      </div>
    );
  }

  function Step8() {
    return (
      <div>
        eight
      </div>
    );
  }

  function Steps() {
    return (
      <>
        <h2>Setup</h2>
        <h3>Step {step}</h3>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
        {step === 4 && <Step4 />}
        {step === 5 && <Step5 />}
        {step === 6 && <Step6 />}
        {step === 7 && <Step7 />}
        {step === 8 && <Step8 />}
        {step > 1 && <Prev />}
        {step > 0 && step < 8 && <Next />}
        {step === 8 && <PlayGame />}
      </>
    )
  }

  return (
    <form className="setup">
      <Switch>
        <Route path="/play/setup/" component={Steps} />
      </Switch>
    </form>
  );
}

export default SetupForm;