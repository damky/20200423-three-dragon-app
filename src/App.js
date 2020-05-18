import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import './styles/App.scss';
import ButtonList from "./components/ButtonList";
import Button from './components/Button'
import Layout from './components/Layout';
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
          <Rules/>
        </Route>
          <Route path="/play">
            <Play/>
          </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  const btns = [
    {to:"/play/setup", text:"Yes, lets play." },
    {to:"/rules", text:"No, I need to see the rules first."}
  ];
  return <React.Fragment>
      <Layout title="Home" titlePadding="6em">
        <p>Would you like to play a game?</p>
        <ButtonList btns={btns} />
      </Layout>
  </React.Fragment>
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
  )
}

function Rules() {
  return (
    <Layout title="Rules" titlePadding="2em">
      <p>You don't need no rules.</p>
      <Button to="/play/setup" text="Play instead." />
    </Layout>
  );
}
