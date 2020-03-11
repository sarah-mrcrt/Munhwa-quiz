import React from "react";
import logo from './logo.svg';
//Import React
import {BrowserRouter, Switch, Route, Link,useParams} from "react-router-dom";
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

function App(props) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;
  const [cookies] = useCookies(['login']);
  const msg = cookies.login && cookies.login.name ? "Disconnet you" : "Connect you";

  return (
    <div className="App">
        <BrowserRouter>
        <header className="App-header">
          <Link  to={'/'}>Home</Link>
          <Link  to={'/login'}>{msg}</Link>
          <Link  to={'/addQuizz'}>AddQuizz</Link>
          <Link  to={'/addQuestion'}>addQuestion</Link>

        </header>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/home" component={Home}/>
            <Route exact={true} path="/addQuizz" component={AddQuizz} />
            <Route exact={true} path="/quizz/:id" component={Quizz}/>
            <Route exact={true} path="/Jouer/:id" component={Jouer}/>
            <Route exact={true} path="/addQuestion" component={AddQuestion} />
            <ProtectedRoute exact={true} path="/addQuizz" component={AddQuizz} />

            <Route exact={true} path="/login" component={Login}/>
            <Route path="*" component={() => <p>Page 404</p>} />
           </Switch>
        </BrowserRouter>
    </div>
  );
}
//


export default App;
