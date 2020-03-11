import React from "react";
import logo from './logo.svg';
import Login, {ProtectedRoute} from "./Login";
import {useCookies} from 'react-cookie';


// import './App.css';
import Home from "./Home.js";
<<<<<<< HEAD
import Quizz from "./Quizz/Quizz.js";
import Jouer from "./Quizz/Jouer.js";

import About from "./About.js";
import AddQuizz from "./Quizz/AddQuizz.js";
=======

import AddQuestion from "./Quizz/AddQuestion.js";
import AddQuizz from "./Quizz/AddQuizz.js";
//import Jouer from "./Quizz/Jouer.js";
// import Questions from "./Quizz/Questions.js";
import Quizz from "./Quizz/Quizz.js";
// import QuizzThumbnail from "./Quizz/QuizzThumbnail.js";


>>>>>>> 14aa7facf8a9897856934591312a398f41242837
import {BrowserRouter, Switch, Route, Link,useParams} from "react-router-dom";

function App() {
  const [cookies] = useCookies(['login']);
    const msg = cookies.login && cookies.login.username ? "connection OK" : "Login/Register";
  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <BrowserRouter>
          <Link  to={'/'}>Home</Link>
          <Link  to={'/about'}>About</Link>
          <Link  to={'/addQuizz'}>AddQuizz</Link>
=======
        <BrowserRouter>
        <header className="App-header">
          <Link  to={'/'}>Home</Link>
          <Link  to={'/addQuizz'}>AddQuizz</Link>
          <Link  to={'/login'}>{msg}</Link>
          {/* if (msg=cookies.login){
            <Link  to={'/login'}>{msg}</Link>
          }else{
            <Link  to={'/login'}>{msg}</Link>
          } */}
          <Link  to={'/addQuestion'}>addQuestion</Link>

        </header>
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
          <Switch>
             <Route exact={true} path="/" component={Home} />
             <Route exact={true} path="/home" component={Home}/>
             <Route exact={true} path="/addQuizz" component={AddQuizz} />
<<<<<<< HEAD
             <Route exact={true} path="/quizz/:id" component={Quizz}/>
             <Route exact={true} path="/quizz/Jouer/:sentence" component={Jouer}/>


             <Route path="*" component={() => <p>Page 404</p>} />
=======
              <Route exact={true} path="/addQuestion" component={AddQuestion} />
             <Route exact={true} path="/quizz/:id" component={Quizz}/>
             {/* <Route exact={true} path="/quizz/jouer/:id" component={Jouer}/> */}

            <ProtectedRoute exact={true} path="/addQuizz" component={AddQuizz} />

            <Route exact={true} path="/login" component={Login}/>
            <Route path="*" component={() => <p>Page 404</p>} />
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
           </Switch>
        </BrowserRouter>
    </div>
  );
}
//


export default App;
