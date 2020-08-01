import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./styles/App.scss";
import ButtonList from "./components/ButtonList";
import Button from "./components/Button";
import Layout from "./components/Layout";
import Game from "./components/Game";
import SetupForm from "./components/SetupForm";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/play/setup">
          <Setup />
        </Route>
        <Route path="/rules">
          <Rules />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  const btns = [
    { to: "/play/setup", text: "Yes, lets play." },
    { to: "/rules", text: "No, I need to see the rules first." },
  ];
  return (
    <React.Fragment>
      <Layout title="Home" titlePadding="6em">
        <p>Would you like to play a game?</p>
        <ButtonList btns={btns} />
        <div
          style={{
            maxWidth: "600px",
            textAlign: "justify",
            margin: "3em auto",
          }}
        >
          <p>
            This game is loosely based on the D&D mini card game Three Dragon
            Ante (3DA). 3DA is played by D&D characters, typically at taverns.
          </p>
          <p>
            After set up, you click "Play Gambit", the page will refresh, and
            you will have "played" three rounds, thereby completing a "Gambit".
            A winner will be declared who will win the stakes of the Gambit.
          </p>
          <p>
            This app is mainly just to help Dungeon Masters determine the
            outcome of a Three Dragon Ante game without actually taking the time
            to roll dice.
          </p>
          <p>
            Sometimes the mechanics need to be rushed so you can get back to
            role playing. Then again, if you like the mechanics of rolling dice,
            I suggest getting the rules for the modified{" "}
            <a href="https://www.dmsguild.com/product/273626/Arclords-ThreeDragon-Ante-Dice-Gambit">
              Three Dragon Ante: Dice Gambit
            </a>{" "}
            written by{" "}
            <a href="https://www.dmsguild.com/browse.php?author=Christopher%20Cox">
              Christopher A. Cox
            </a>
            .
          </p>
        </div>
      </Layout>
    </React.Fragment>
  );
}

function Setup() {
  return (
    <Layout title="Setup" titlePadding="2em">
      <SetupForm />
    </Layout>
  );
}

function Play() {
  return (
    <Layout title="Three Dragon Ante" titlePadding="2em">
      <Game />
    </Layout>
  );
}

function Rules() {
  return (
    <Layout title="Rules" titlePadding="2em">
      <p>You don't need no rules.</p>
      <div
        style={{
          maxWidth: "600px",
          textAlign: "justify",
          margin: "3em auto",
        }}
      >
        <p>But since you insist...</p>
        <p>
          To play, you'll need to go through the set up process to decide on
          number of players (2-6), if some are real or NPC (non player
          characters), if any of the players should have advantage ("real good"
          players), and whether you are playing with/for gold pieces, silver,
          copper, or platinum. Electrum isn't calculated. Cause I hate using it.
        </p>
        <p>
          Some tips: Only use real names for real players. NPC's are named
          player1, player2, etc. Your hoard size is how much gold everyone is
          willing to start with.{" "}
        </p>
      </div>
      <Button to="/play/setup" text="Play." />
    </Layout>
  );
}

function NoMatch() {
  return <Redirect to="/" />;
}
