import React, {useEffect, useContext} from "react";
import { Switch, Route, Link } from "react-router-dom";
import SelectOption from "./SelectOption";
import {GameContext} from "../utils/GameInfo";
// import { Consumer } from "../utils/context";
// import { StoreContext } from "..";
// import ReactDOM from "react-dom";

const SetupForm = () => {  
  // let matchStart = useRouteMatch("/play/setup/");
  // let matchEnd = useRouteMatch("/play/setup/8");
  const gameDispatch = useContext(GameContext);
  // const gameState = useContext(StoreContext);
  console.log('gameDispatch', gameDispatch);

  const {state, dispatch, gameState} = gameDispatch;
  const step = state.setup.step;
  let curUrl = document.location.protocol + "//" + document.location.host + "/play/setup/" + step;
  console.log('curUrl',curUrl);
  console.log('step',step);
  console.log('gameState',gameState);
  console.log('state',state);
  
  function Prev() {
    // function subtr(){dispatch({type:'SUBTRACT_STEP'})}
    function startOver() {
      dispatch({type: "START_OVER"})
      document.location = document.location.protocol + "//" + document.location.host + "/play/setup/"
    }
    return (
      <>
        <br/>
        <button onClick={startOver} className="btn">Start Over</button>
      </>
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
      if (count === undefined) {count = state.setup.playersCount}
      if (c === undefined) {c = Object.keys(state.gambit.players).length}
      while (c < count) {
        dispatch({type:"NEW_PLAYER"});
        c++;
        console.log('added new player');
        
      }
    }
    return (
      <div>
        <label>
          <h4>OK. How many are playing?</h4> 
            <select 
              value={state.setup.playersCount} 
              onChange={(e) => {
                let count = e.target.value;
                dispatch({ type: `PLAYERS_COUNT_${count}`});
                createPlayers(e.target.value,state.setup.playersCount);
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

  function NameInput(props) {
    return (
      <>
        <label>
          {props.label}
          <br/>
              <input type="text" name={props.name} placeholder={props.placeholder} iter={props.iter} onChange={props.onChange} />
        </label>
        <br/>
      </>
    )
  }
  
  function Step2() {  
    const {gambit:{players}} = state;
    const playersArr = Object.values(players);
    const names = playersArr.map( (player, iter) => <NameInput key={players[`Player${iter+1}`].name + 'nameKey'} iter={iter} name={`Player${iter+1}`} label={`Player ${iter+1} name:`} onChange={(e) => {
      
      const target = e.target;
      // console.log('testing change', target.value);
      dispatch({type: "HANDLE_PLAYER_NAME_CHANGE", payload: target});
    }} placeholder={player.name} /> );
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
    const {gambit:{players}} = state;
    const playersArr = Object.values(players);
    const realPlayers = playersArr.filter((player)=>player.isReal);
    const theRealPlayers = realPlayers.map((player) => <label key={`${player.player}RealGoodPlayerKey`}>{`${player.name}`}<input type="checkbox" name={`${player.player}`} onChange={(e) => {
      const target = e.target;
      dispatch({type:"HANDLE_CHECKBOX", payload: target});
    }} /><br/></label>)
    return (
      <>
        {realPlayers.length > 0 ? <h4>And who is proficient with a gaming set or owns a set of Three-Dragon-Ante?</h4> : <h4>Nobody is real? If you say so.</h4>}
        {theRealPlayers}
      </>
    );
  }

  function Step4() {
    return (
      <>
        four
      </>
    );
  }

  function Step5() {
    return (
      <>
        five
      </>
    );
  }

  function Step6() {
    return (
      <>
        six
      </>
    );
  }

  function Step7() {
    return (
      <>
        seven
      </>
    );
  }

  function Step8() {
    return (
      <>
        eight
      </>
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
        {step > 0 && step < 8 && <Next />}
        {step === 8 && <PlayGame />}
        {step > 1 && <Prev />}
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