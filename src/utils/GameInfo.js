import React, { useReducer, createContext, useContext } from "react";
import { StoreContext } from "../index";
// import { Provider } from "../utils/context";

const GameContext = createContext({});

const GameProvider = ( { children } ) => {
  // const InnerGameContext = createContext(StoreContext);
  const gameState = useContext(StoreContext);
  
  const [state, dispatch] = useReducer((state, action) => {
    const newState = gameState;

    const subtractStep = function(){
      let curStep = state.setup.step;
      if (curStep < 1) {
        curStep = 1
        return curStep;
      } 
      else {
        curStep = state.setup.step - 1
        return curStep;
      };
    }

    const addStep = function(){
      let curStep = state.setup.step;
      if (curStep < 1) {
        curStep = 1;
        return curStep;
      } 
      if (curStep > 8) {
        return 8;
      } 
      else {
        curStep = state.setup.step + 1;
        return curStep;
      };
    }

    const toggleFinished = ()=>{
      return !state.setup.finished;
    };

    switch (action.type) {
      case 'START_OVER':
        return newState;
      case 'TOGGLE_FINISHED':
        return {
          setup: {
            step: state.setup.step,
            finished: toggleFinished(),
            playersCount: state.setup.playersCount
          },
          gambit: state.gambit
        }
      case 'NEW_PLAYER':
        class Player {
          constructor(name, isReal, isRealGood, hoard) {
            this.player = name;
            this.name = name;
            this.isReal = isReal;
            this.isRealGood = isRealGood;
            this.hoard = hoard;
          }
        }
        function newPlayer() {
          const {gambit:{players}} = state;
          let playerIter = `Player${Number(Object.keys(players).length)+1}`;
          let player = new Player(playerIter,false,false,100);
          players[playerIter] = player;
          return state;
        }
        return newPlayer();
      case 'CLEAR_PLAYERS':
        function clearPlayers() {
          const {gambit} = state;
          gambit.players = {};
          return state;
        };
        return clearPlayers();
      case 'PLAYERS_COUNT_2':
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 2
          },
          gambit: state.gambit
        }
      case 'PLAYERS_COUNT_3':
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 3
          },
          gambit: state.gambit
        }
      case 'PLAYERS_COUNT_4':
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 4
          },
          gambit: state.gambit
        }
      case 'PLAYERS_COUNT_5':
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 5
          },
          gambit: state.gambit
        }
      case 'PLAYERS_COUNT_6':
        return {
          setup: {
            step: state.setup.step,
            finished: state.setup.finished,
            playersCount: 6
          },
          gambit: state.gambit
        }
      case 'ADD_STEP':
        return {
          setup: {
            step: addStep(),
            finished: state.setup.finished,
            playersCount: state.setup.playersCount
          },
          gambit: state.gambit
        }
      case 'SUBTRACT_STEP':
        return {
          setup: {
            step: subtractStep(),
            finished: state.setup.finished,
            playersCount: state.setup.playersCount
          },
          gambit: state.gambit
        }
      case 'HANDLE_PLAYER_NAME_CHANGE': 
        function handlePlayerChange(e) {
          const {gambit} = state;
          const player = e.name;
          const value = e.value;
          gambit.players[player].name = value;
          if (gambit.players[player].name === "") {
            gambit.players[player].name = gambit.players[player].player
            gambit.players[player].isReal = false;
          } else {
            gambit.players[player].isReal = true;
          }
          return state;
        };
        return handlePlayerChange(action.payload);
      case 'HANDLE_CHECKBOX':
        function handleCheckbox(e) {
          const {gambit} = state;
          const player = e.name;
          const value = e.checked;
          value ? gambit.players[player].isRealGood = true : gambit.players[player].isRealGood = false;
          return state;
        }
        return handleCheckbox(action.payload)
      default:
        throw new Error();
    };
  }, gameState);

  return <GameContext.Provider value={{ state, dispatch, gameState }}>{children}</GameContext.Provider>;
};

// const gameContext = createContext(GameProvider)

export { GameProvider, GameContext };