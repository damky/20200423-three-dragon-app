import React, { useContext } from "react";
import ReactDOM from "react-dom";
// import { Consumer } from "../utils/context";
import { Redirect } from "react-router-dom";
// import { StoreContext } from "..";
import { GameContext } from "../utils/GameInfo";

function Game(props) {
  const gameDispatch = useContext(GameContext);
  const { state, dispatch } = gameDispatch;
  const stPlayers = state.gambit.players;
  // console.log(state, stPlayers);

  const Player = (props) => {
    return (
      <div className="player" id={props.id} data-winner={props.winner}>
        <h3 className="name">{props.name}</h3>
        <p>
          <b>Hoard: </b>
          <span className="hoard">{props.hoard} </span>
          {props.denomination}
        </p>
        <p>
          <b>Ante: </b>
          <span className="ante">{props.ante}</span>
        </p>
        <p>
          <b>Flight: </b>
          <span className="flight"></span>
        </p>
      </div>
    );
  };

  const players = Object.values(stPlayers).map((player) => (
    <Player
      key={`${player.name}-key`}
      id={player.player}
      name={player.name}
      hoard={player.hoard}
      ante={player.ante}
      denomination={state.gambit.denomination}
      winner={player.winner}
    />
  ));

  const PlayGambit = () => {
    let turnOrder = Object.values(stPlayers).map((x) => x.player);
    const startGambit = async () => {
      // reset flights
      turnOrder.forEach((turn) => {
        stPlayers[turn].flight = [];
        stPlayers[turn].winner = "false";
        state.gambit.allDragons = [];
      });

      // each player ante
      await dispatch({ type: "ANTE_UP" });

      // set turn order based on ante
      turnOrder = Object.values(stPlayers)
        .sort((a, b) => b.ante - a.ante)
        .map((x) => x.player);

      // set ante
      const ante = stPlayers[turnOrder[0]].ante;
      let stakes = state.gambit.stakes;

      // pay ante (1/2 if highroller)
      turnOrder.forEach((turn, i) => {
        // pay half ante
        // if you can pay it, pay all (still half), otherwise pay what you can
        if (i === 0) {
          if (stPlayers[turn].hoard >= Math.floor(ante / 2)) {
            stakes += Math.floor(ante / 2);
            stPlayers[turn].hoard -= Math.floor(ante / 2);
          } else {
            stakes += stPlayers[turn].hoard;
            stPlayers[turn].hoard = 0;
          }
          console.log(turn, stPlayers[turn].hoard, stakes);
          return;
        }

        // pay ante
        // if you can pay it, pay all, otherwise pay what you can
        if (stPlayers[turn].hoard >= ante) {
          stakes += ante;
          stPlayers[turn].hoard -= ante;
        } else {
          stakes += stPlayers[turn].hoard;
          stPlayers[turn].hoard = 0;
        }
        console.log(turn, stPlayers[turn].hoard, stakes);
      });

      // roll everyone's flight by playing three rounds
      playRound();
      playRound();
      playRound();
      winnings();

      // play one round
      function playRound() {
        // set up dragon cards
        class Dragon {
          constructor() {
            let x = roll("1d12");
            x % 2 === 0 ? (this.alignment = "good") : (this.alignment = "evil");
            if (x === 1) {
              this.strength = 1;
              this.type = "Tiamat";
              this.god = true;
              return;
            }
            if (x === 2) {
              this.strength = roll("1d4");
              this.type = "Brass";
              this.god = false;
              return;
            }
            if (x === 3) {
              this.strength = roll("1d4");
              this.type = "White";
              this.god = false;
              return;
            }
            if (x === 4) {
              this.strength = roll("1d6");
              this.type = "Copper";
              this.god = false;
              return;
            }
            if (x === 5) {
              this.strength = roll("1d6");
              this.type = "Black";
              this.god = false;
              return;
            }
            if (x === 6) {
              this.strength = roll("1d8");
              this.type = "Bronze";
              this.god = false;
              return;
            }
            if (x === 7) {
              this.strength = roll("1d8");
              this.type = "Green";
              this.god = false;
              return;
            }
            if (x === 8) {
              this.strength = roll("1d10");
              this.type = "Silver";
              this.god = false;
              return;
            }
            if (x === 9) {
              this.strength = roll("1d10");
              this.type = "Blue";
              this.god = false;
              return;
            }
            if (x === 10) {
              this.strength = roll("1d12");
              this.type = "Gold";
              this.god = false;
              return;
            }
            if (x === 11) {
              this.strength = roll("1d12");
              this.type = "Red";
              this.god = false;
              return;
            }
            if (x === 12) {
              this.strength = 13;
              this.type = "Bahamut";
              this.god = true;
              return;
            }
          }
        }
        turnOrder.forEach((turn, i) => {
          // play card and add to flight
          const dragon = new Dragon();
          stPlayers[turn].flight.push(dragon);
          state.gambit.allDragons.push(dragon);
        });
      }

      // award winning hands
      function winnings() {
        if (state.gambit.allDragons.some((x) => x.type === "Tiamat")) {
          state.gambit.strongestFlightWins = false;
        }

        let flightStrengths = turnOrder.map(
          (turn) =>
            stPlayers[turn].flight[0].strength +
            stPlayers[turn].flight[1].strength +
            stPlayers[turn].flight[2].strength
        );

        // evaluate the winner and loser
        const winner = evalWinner(evalWinner);
        const loser = evalLoser(evalLoser);

        // if tiamat then loser wins
        state.gambit.strongestFlightWins
          ? (winner.winner = "true")
          : (loser.winner = "true");

        // apply style trigger for winner
        turnOrder.forEach((turn) => {
          stPlayers[turn].winner === "true"
            ? (document.querySelector(`#${turn}`).dataset.winner = "true")
            : (document.querySelector(`#${turn}`).dataset.winner = "false");
        });

        function evalWinner(callback) {
          let maxFlightStrength = Math.max(...flightStrengths);
          let maxFSIter = 0;

          flightStrengths.forEach((strength) => {
            if (maxFlightStrength === strength) {
              maxFSIter = maxFSIter + 1;
            }
          });

          if (maxFSIter === 1) {
            console.log(
              "winner",
              stPlayers[turnOrder[flightStrengths.indexOf(maxFlightStrength)]]
            );

            return stPlayers[
              turnOrder[flightStrengths.indexOf(maxFlightStrength)]
            ];
          }

          if (maxFSIter > 1) {
            flightStrengths = flightStrengths.map((strength) =>
              strength === maxFlightStrength ? null : strength
            );
            callback();
          }
        }

        function evalLoser(callback) {
          let minFlightStrength = Math.min(...flightStrengths);
          let minFSIter = 0;

          flightStrengths.forEach((strength) => {
            if (minFlightStrength === strength) {
              minFSIter = minFSIter + 1;
            }
          });

          if (minFSIter === 1) {
            console.log(
              "Loser",
              stPlayers[turnOrder[flightStrengths.indexOf(minFlightStrength)]]
            );

            return stPlayers[
              turnOrder[flightStrengths.indexOf(minFlightStrength)]
            ];
          }

          if (minFSIter > 1) {
            flightStrengths = flightStrengths.map((strength) =>
              strength === minFlightStrength ? null : strength
            );
            callback();
          }
        }

        console.log(state.gambit.allDragons);
      }

      // roll dice
      function roll(d) {
        const dice = d.match(/(\d+)d(\d+)/);
        const rollAmt = Number(dice[1]);
        const dieType = Number(dice[2]);
        let rollSum = 0;
        for (let i = 0; i < rollAmt; i++) {
          rollSum += Math.ceil(Math.random() * dieType);
        }
        return rollSum;
      }

      // render the results of ante
      players.forEach((player, i) => {
        ReactDOM.render(
          <React.Fragment>{stPlayers[`Player${i + 1}`].ante}</React.Fragment>,
          document.querySelector(`#Player${i + 1} .ante`)
        );
      });

      // render results of flights
      players.forEach((player, i) => {
        ReactDOM.render(
          <React.Fragment>
            {stPlayers[`Player${i + 1}`].flight[0].strength +
              stPlayers[`Player${i + 1}`].flight[1].strength +
              stPlayers[`Player${i + 1}`].flight[2].strength}
          </React.Fragment>,
          document.querySelector(`#Player${i + 1} .flight`)
        );
      });

      console.log(state, stPlayers);
    };
    return (
      <div>
        <button onClick={startGambit}>Start Gambit</button>
      </div>
    );
  };

  return (
    <div>
      {!state.setup.finished && <Redirect to="/play/setup/" />}
      <div className="players">{players}</div>
      <PlayGambit />
    </div>
  );
}

export default Game;
