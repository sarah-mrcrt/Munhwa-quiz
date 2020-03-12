import React from "react";
//import LOGO from "./assets/IMG/LOGO.svg";
//Import React
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {useCookies} from 'react-cookie';
import axios from 'axios';
//Fichiers Lambdas
import Login, {ProtectedRoute} from "./Login";
import Home from "./Home.js";
//Fichiers Quizz
import Quizz from "./Quizz/Quizz.js";
import Jouer from "./Quizz/Jouer.js";
import AddQuizz from "./Quizz/AddQuizz.js";
import AddQuestion from "./Quizz/AddQuestion.js";
import error404 from "./error404.js";

function App(props) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
  const [cookies, removeCookie] = useCookies(['login']);
  const msg = cookies.login && cookies.login.name ? "Profile" : "Connect you";
  function disconnect() {
        removeCookie('login');
  }
  if (cookies.login && cookies.login.name) {
    return (
        <>
        <div className="App">
          <BrowserRouter>
          <header className="App-header">
            <Link  to={'/'}>Home</Link>
            <Link  to={'/login'}>{msg}</Link>
            <Link  to={'/addQuizz'}>AddQuizz</Link>      
            <button id="disconnect" onClick={disconnect}>disconnect</button>
          </header>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/home" component={Home}/>
              <Route exact={true} path="/login" component={Login}/>
            
              {/* Quizz part */}
              <Route exact={true} path="/addQuizz" component={AddQuizz} />
              <Route exact={true} path="/quizz/:id" component={Quizz}/>
              <Route exact={true} path="/Jouer/:id" component={Jouer}/>
              {/* Quizz if i am log */}
              <ProtectedRoute exact={true} path="/addQuizz" component={AddQuizz} />
              <ProtectedRoute exact={true} path="/AddQuestion" component={AddQuestion} />

            <Route path="*" component={error404} />
            </Switch>
          </BrowserRouter>
      </div>
        </>        
        )
    }
  return (
    <div className="App">
        <BrowserRouter>
        <header >
          <img id="logo" src="LOGO.svg" />
        </header>
        <header className="App-header">
          <Link id="home" to={'/'}>Home</Link>
          <Link id="signin" to={'/login'}>{msg}</Link>
        </header>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/home" component={Home}/>
            <Route exact={true} path="/login" component={Login}/>
            {/* Quizz part */}
            <Route exact={true} path="/addQuizz" component={AddQuizz} />
            <Route exact={true} path="/quizz/:id" component={Quizz}/>
            <Route exact={true} path="/Jouer/:id" component={Jouer}/>
           <Route path="*" component={() => <p>Page 404</p>} />
           </Switch>
        </BrowserRouter>
    </div>
  )
}
//


export default App;
