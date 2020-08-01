import React, { useReducer, createContext, useContext } from "react";
import { StoreContext } from "../index";
// import { Provider } from "../utils/context";

const GameContext = createContext({});

const GameProvider = ({ children }) => {
  // const InnerGameContext = createContext(StoreContext);
  const gameState = useContext(StoreContext);

  const [state, dispatch] = useReducer((state, action) => {
    const newState = gameState;

    const subtractStep = function () {
      let curStep = state.setup.step;
      if (curStep < 1) {
        curStep = 1;
        return curStep;
      } else {
        curStep = state.setup.step - 1;
        return curStep;
      }
    };

    const addStep = function () {
      let curStep = state.setup.step;
      if (curStep < 1) {
        curStep = 1;
        return curStep;
      }
      if (curStep > 6) {
        return 6;
      } else {
        curStep = state.setup.step + 1;
        return curStep;
      }
    };

    const toggleFinished = () => {
      return !state.setup.finished;
    };

    const roll = (d) => {
      const dice = d.match(/(\d+)d(\d+)/);
      const rollAmt = Number(dice[1]);
      const dieType = Number(dice[2]);
      let rollSum = 0;
      for (let i = 0; i < rollAmt; i++) {
        rollSum += Math.ceil(Math.random() * dieType);
      }
      return rollSum;
    };

    switch (action.type) {
      case "START_OVER":
        return newState;
      case "TOGGLE_FINISHED":
        return {
          setup: {
            step: state.setup.step,
            finished: toggleFinished(),
            playersCount: state.setup.playersCount,
          },
          gambit: state.gambit,
        };
      case "NEW_PLAYER":
        class Player {
          constructor(name, isReal, isRealGood, hoard, flight) {
            this.player = name;
            this.name = name;
            this.isReal = isReal;
            this.isRealGood = isRealGood;
            this.hoard = hoard;
            this.flight = flight;
            this.winner = "false";
          }
        }
        function newPlayer() {
          const {
            gambit: { players },
          } = state;
          let playerIter = `Player${Number(Object.keys(players).length) + 1}`;
          let player = new Player(playerIter, false, false, 100, []);
          players[playerIter] = player;
          return state;
        }
        return newPlayer();
      case "CLEAR_PLAYERS":
        function clearPlayers() {
          const { gambit } = state;
          gambit.players = {};
          return state;
        }
        return clearPlayers();
      case "PLAYERS_COUNT_2":
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 2,
          },
          gambit: state.gambit,
        };
      case "PLAYERS_COUNT_3":
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 3,
          },
          gambit: state.gambit,
        };
      case "PLAYERS_COUNT_4":
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 4,
          },
          gambit: state.gambit,
        };
      case "PLAYERS_COUNT_5":
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 5,
          },
          gambit: state.gambit,
        };
      case "PLAYERS_COUNT_6":
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 6,
          },
          gambit: state.gambit,
        };
      case "ADD_STEP":
        return {
          setup: {
            step: addStep(),
            finished: state.setup.finished,
            playersCount: state.setup.playersCount,
          },
          gambit: state.gambit,
        };
      case "SUBTRACT_STEP":
        return {
          setup: {
            step: subtractStep(),
            finished: state.setup.finished,
            playersCount: state.setup.playersCount,
          },
          gambit: state.gambit,
        };
      case "IS_REAL":
        function isReal(e) {
          const { gambit } = state;
          const player = e.name;
          const value = e.value;
          // console.log("is it running?");

          if (value === gambit.players[player].player || value === "") {
            // gambit.players[player].name = gambit.players[player].player
            gambit.players[player].isReal = false;
            // console.log("does it if?");
          } else {
            gambit.players[player].isReal = true;
            // console.log("does it else?");
          }
          return state;
        }
        return isReal(action.payload);
      case "HANDLE_CHECKBOX":
        function handleCheckbox(e) {
          const { gambit } = state;
          const player = e.name;
          const property = e.property;
          const value = e.checked;
          value
            ? (gambit.players[player][property] = true)
            : (gambit.players[player][property] = false);
          return state;
        }
        return handleCheckbox(action.payload);
      case "PLAYER_INPUT":
        function playerInput(e) {
          const { gambit } = state;
          const player = e.name;
          const placeholder = e.placeholder;
          const property = e.dataset.property;
          let value;
          e.type === "number" ? (value = Number(e.value)) : (value = e.value);
          value === ""
            ? (gambit.players[player][property] = placeholder)
            : (gambit.players[player][property] = value);
          return state;
        }
        return playerInput(action.payload);
      case "GAMBIT_INPUT":
        function gambitInput(e) {
          const { gambit } = state;
          const name = e.name;
          const placeholder = e.placeholder;
          const value = e.value;
          gambit.denomination = "";
          // console.log(e,gambit,value);
          value === "" ? (gambit[name] = placeholder) : (gambit[name] = value);
          return state;
        }
        return gambitInput(action.payload);
      case "ANTE_UP":
        function anteUp() {
          const {
            gambit: { players },
          } = state;
          for (let i = 0; i < Object.keys(players).length; i++) {
            const player = players[`Player${i + 1}`];
            player.ante = roll("1d12");
          }
          return state;
        }
        return anteUp();
      default:
        throw new Error();
    }
  }, gameState);

  return (
    <GameContext.Provider value={{ state, dispatch, gameState }}>
      {children}
    </GameContext.Provider>
  );
};

// const gameContext = createContext(GameProvider)

export { GameProvider, GameContext };
