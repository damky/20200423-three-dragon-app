import React from 'react';
import { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import './styles/App.scss'
import Button from "./components/Button";
import DropSelect from './components/DropSelect';
import SelectOption from './components/SelectOption';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
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
      </main>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  return <React.Fragment>
    <h2>Home</h2>
      <div className="centerBlock">
        <p>Would you like to play a game?</p>
        <ul>
          <li><Button to="/play/setup" text="Yes, lets play." /></li>
          <li><Button to="/rules" text="No, I need to see the rules first." /></li>
        </ul>
      </div>
  </React.Fragment>
}

function Setup() {
  return (
    <React.Fragment>
      <h2>Setup</h2>
      <main>
        <div className="centerBlock">
          <DropSelect>
          <SelectOption value={2} />
          <SelectOption value={3} />
          <SelectOption value={4} />
          <SelectOption value={5} />
          <SelectOption value={6} />
        </DropSelect>
        </div>
      </main>
    </React.Fragment>
  )
}

function Rules() {
  return <React.Fragment>
    <h2>Rules</h2>
    <main>
      <div className="centerBlock"><p>You don't need no rules.</p></div>
    </main>
  </React.Fragment>
}

function Header(){
  return <Nav/>
}

function Nav() {
  return (
    <nav className='Nav'>
      <ul>
        <li>
          <Link to="/" className="logo" >Three Dragons</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/play/setup">Setup</Link>
        </li>
        <li>
          <Link to="/rules">Rules</Link>
        </li>
      </ul>
    </nav>
  )
}