import React, {useContext} from "react";
import { Switch, Route, Link } from "react-router-dom";
import SelectOption from "./SelectOption";
import { GameInfo } from "../utils/GameInfo";

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

  function Prev(props) {
    function subtr(){dispatch({type:'SUBTRACT_STEP'})}
    return (
      <button onClick={subtr} className="btn">Previous</button>
    )
  }

  function Next(props) {
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


  function Step1(props) {
    return (
      <div>
        one
        <label>
          Ok. How many are playing? 
          <select 
            value={gameState.state.setup.playersCount} 
            onChange={(e) => {
              let count = e.target.value;
              dispatch({ type: `PLAYERS_COUNT_${count}`})
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

  function Step2(props) {
    return (
      <div>
        two
      </div>
    );
  }

  function Step3(props) {
    return (
      <div>
        three
      </div>
    );
  }

  function Step4(props) {
    return (
      <div>
        four
      </div>
    );
  }

  function Step5(props) {
    return (
      <div>
        five
       
          
      </div>
    );
  }

  function Step6(props) {
    return (
      <div>
        six
      </div>
    );
  }

  function Step7(props) {
    return (
      <div>
        seven
      </div>
    );
  }

  function Step8(props) {
    return (
      <div>
        eight
      </div>
    );
  }



  function Steps(props) {
    return (
      <>
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