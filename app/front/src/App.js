import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';
import Home from "./Home.js";
import About from "./About.js";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">    
        <BrowserRouter>
          <Link  to={'/'}>Home</Link> 
          <Link  to={'/about'}>About</Link> 
          <Switch>
             <Route exact={true} path="/" component={Home} />
             <Route exact={true} path="/about" component={About} />
             <Route path="*" component={() => <p>Page 404</p>} />
           </Switch>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
