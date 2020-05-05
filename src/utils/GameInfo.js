import React, { createContext, useReducer, useState } from "react";

const initialState = {
  setup: {
    step: 1,
    finished: false,
    playersCount: 2
  },
  gambit: {
    players: [],
    stakes: 0
  }
};
const GameInfo = createContext(initialState);
const { Provider } = GameInfo;

const StateProvider = ( { children } ) => {
  const [curState, setCurState] = useState(initialState);

  const [state, dispatch] = useReducer((state, action) => {
    const newState = initialState;

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
            this.name = name;
            this.isReal = isReal;
            this.isRealGood = isRealGood;
            this.hoard = hoard;
          }
        }
        function newPlayer() {
          const {gambit} = state;
          const {players} = gambit;
          let player = new Player("Player"+(players.length + 1),false,false,100);
          players.push(player);
          return state;
        }
        return newPlayer();
      case 'CLEAR_PLAYERS':
        function clearPlayers() {
          const {gambit} = state;
          gambit.players = [];
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
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch, curState, setCurState }}>{children}</Provider>;
};

export { GameInfo, StateProvider };
