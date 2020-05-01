import React, {useState, useEffect} from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import SelectOption from "./SelectOption";

export const SetupForm = () => {
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState(0);

  let matchStart = useRouteMatch("/play/setup")
  let matchEnd = useRouteMatch("/play/setup/8");
  useEffect(() => {
    matchEnd ? setFinished(true) : setFinished(false);
  }, [matchEnd]);

  function doNext(e) {
    e.preventDefault();
    document.location = matchStart.path + "/" + useStep;
  }

  function useStep(step) {
    setStep(step + 1);
    return step;
  }

  function playGame(e) {
    e.preventDefault();
    console.log('did playGame');
  }

  return (
    <form onSubmit={(!finished && doNext) || (finished && playGame)} className="setup">
      <Switch>
        <Route path={matchStart.path + "/0"} component={Start}></Route>
        <Route path={matchStart.path + "/1"}>
          <One />
        </Route>
        <Route>
          <Two />
        </Route>
      </Switch>
      {(!matchStart.isExact && <input type="submit" value={!matchEnd ? "next" : "submit"}/>) || (matchStart.isExact && <Redirect to={matchStart && matchStart.path + "/" + step} />)}
    </form>
  );
}

function Start(props) {
  const [playerCount, setPlayerCount] = useState(2);
  return (
    <label>
      Ok. How many are playing? 
      <select value={playerCount} onChange={(e) => setPlayerCount(e.target.value)}>
        <SelectOption value={2} />
        <SelectOption value={3} />
        <SelectOption value={4} />
        <SelectOption value={5} />
        <SelectOption value={6} />
      </select>
    </label>
  );
}

function One(props) {
  return (
    <label>
      And what are the names of the real people who wanna roll their own dice?
      <input type="text" name="firstName" required/>
    </label>
  );
}

function Two(props) {
  return (
    <div />
  );
}