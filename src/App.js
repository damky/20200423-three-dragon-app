import React from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import './styles/App.scss';
import DropSelect from './components/DropSelect';
import SelectOption from './components/SelectOption';
import ButtonList from "./components/ButtonList";
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>    
      <Switch>
        <Route path="/play/setup">
          <Setup/>
        </Route>
        <Route path="/rules">
          <Rules/>
        </Route>
        <Route path="/">
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
      <DropSelect>
        <SelectOption value={2} />
        <SelectOption value={3} />
        <SelectOption value={4} />
        <SelectOption value={5} />
        <SelectOption value={6} />
      </DropSelect>
    </Layout>
  );
}

function Rules() {
  return (
    <Layout title="Rules" titlePadding="2em">
      <p>You don't need no rules.</p>
    </Layout>
  );
}
