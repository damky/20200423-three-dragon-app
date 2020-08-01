import React, { useEffect, useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import SelectOption from "./SelectOption";
import { GameContext } from "../utils/GameInfo";
import Input from "./Input";
import "../styles/Setup.scss";
// import { Consumer } from "../utils/context";
// import { StoreContext } from "..";
// import ReactDOM from "react-dom";

const SetupForm = () => {
  // let matchStart = useRouteMatch("/play/setup/");
  // let matchEnd = useRouteMatch("/play/setup/8");
  const gameDispatch = useContext(GameContext);
  // const gameState = useContext(StoreContext);

  // console.log('gameDispatch', gameDispatch);

  const { state, dispatch } = gameDispatch;
  const step = state.setup.step;
  // let curUrl = document.location.protocol + "//" + document.location.host + "/play/setup/" + step;

  // console.log('step',step);
  // console.log('state',state);

  function Prev() {
    // function subtr(){dispatch({type:'SUBTRACT_STEP'})}
    function startOver() {
      dispatch({ type: "START_OVER" });
      return <Redirect to="/play/setup" />;
    }
    return (
      <>
        <br />
        <button onClick={startOver} className="btn">
          Start Over
        </button>
      </>
    );
  }

  function Next() {
    function add() {
      dispatch({ type: "ADD_STEP" });
    }
    return (
      <button onClick={add} className="btn">
        Next
      </button>
    );
  }

  function PlayGame() {
    return (
      <Link
        to="/play"
        onClick={() => {
          dispatch({ type: "TOGGLE_FINISHED" });
        }}
        className="btn"
      >
        Play
      </Link>
    );
  }

  function Step1() {
    useEffect(() => {
      createPlayers();
    });

    function createPlayers(c, count) {
      dispatch({ type: "CLEAR_PLAYERS" });
      if (count === undefined) {
        count = state.setup.playersCount;
      }
      if (c === undefined) {
        c = Object.keys(state.gambit.players).length;
      }
      while (c < count) {
        dispatch({ type: "NEW_PLAYER" });
        c++;
        // console.log("added new player");
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
              dispatch({ type: `PLAYERS_COUNT_${count}` });
              createPlayers(e.target.value, state.setup.playersCount);
            }}
          >
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

  function Step2() {
    const {
      gambit: { players },
    } = state;
    const playersArr = Object.values(players);
    const names = playersArr.map((player, iter) => (
      <Input
        type="text"
        key={players[`Player${iter + 1}`].name + "nameKey"}
        iter={iter}
        name={`Player${iter + 1}`}
        data-property="name"
        preLabel={`Player ${iter + 1} name:`}
        onChange={(e) => {
          const target = e.target;
          // console.log('testing change', target.value);
          dispatch({ type: "PLAYER_INPUT", payload: target });
          dispatch({ type: "IS_REAL", payload: target });
        }}
        placeholder={player.name}
      />
    ));
    return (
      <React.Fragment>
        <h4>
          and what are the names of the real people who wanna roll their own
          dice?
        </h4>
        <div id="playersNames">{names}</div>
      </React.Fragment>
    );
  }

  function Step3() {
    const {
      gambit: { players },
    } = state;
    const playersArr = Object.values(players);
    const realPlayers = playersArr.filter((player) => player.isReal);
    const theRealPlayers = realPlayers.map((player) => (
      <Input
        postLabel={player.name}
        key={`${player.player}RealGoodPlayerKey`}
        type="checkbox"
        name={`${player.player}`}
        property={player.player.isRealGood}
        onChange={(e) => {
          const target = e.target;
          dispatch({ type: "HANDLE_CHECKBOX", payload: target });
        }}
      />
    ));
    return (
      <>
        {realPlayers.length > 0 ? (
          <h4>
            And who is proficient with a gaming set or owns a set of
            Three-Dragon-Ante?
          </h4>
        ) : (
          <h4>Nobody is real? If you say so.</h4>
        )}
        {theRealPlayers}
      </>
    );
  }

  function Step4() {
    return (
      <>
        <h4>What's the initial hoard size?</h4>
        <Input
          preLabel="Hoard Size"
          type="number"
          name="hoardSize"
          data-property="hoard"
          placeholder="100"
          onChange={async (e) => {
            const target = e.target;
            const {
              gambit: { players },
            } = state;
            target.value = await Math.abs(Number(target.value));
            Object.keys(players).forEach((player, iter) => {
              target.name = [`Player${iter + 1}`];
              dispatch({ type: "PLAYER_INPUT", payload: target });
            });
          }}
        />
      </>
    );
  }

  function Step5() {
    return (
      <>
        <h4>
          And is that gp, sp, or cp? Nobody wants ep, and if you say pp then
          just get out.
        </h4>
        <label>
          $ Denomination $<br />
          <select
            name="denomination"
            placeholder="gp"
            defaultValue="-"
            onChange={(e) => {
              const target = e.target;
              dispatch({ type: "GAMBIT_INPUT", payload: target });
            }}
          >
            <option value="-" hidden disabled>
              Choose here
            </option>
            <SelectOption value="gp" />
            <SelectOption value="sp" />
            <SelectOption value="cp" />
            <option value="pp">OK fine, pp</option>
          </select>
        </label>
      </>
    );
  }

  function Step6() {
    return (
      <>
        <h4>Let's Play!</h4>
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
        {step > 0 && step < 6 && <Next />}
        {step === 6 && <PlayGame />}
        {step > 1 && <Prev />}
      </>
    );
  }

  return (
    <form className="setup">
      <Switch>
        <Route path="/play/setup" component={Steps} />
      </Switch>
    </form>
  );
};

export default SetupForm;
