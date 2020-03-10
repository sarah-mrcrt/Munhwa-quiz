import React from "react";
import logo from './logo.svg';
import Login, {ProtectedRoute} from "./Login";


// import './App.css';
import Home from "./Home.js";

// import AddQuestions from "./Quizz/AddQuestions.js";
import AddQuizz from "./Quizz/AddQuizz.js";
//import Jouer from "./Quizz/Jouer.js";
// import Questions from "./Quizz/Questions.js";
import Quizz from "./Quizz/Quizz.js";
// import QuizzThumbnail from "./Quizz/QuizzThumbnail.js";


import {BrowserRouter, Switch, Route, Link,useParams} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <header className="App-header">
          <Link  to={'/'}>Home</Link>
          <Link  to={'/addQuizz'}>AddQuizz</Link>
          <Link  to={'/login'}>Login</Link>
        </header>
          <Switch>
             <Route exact={true} path="/" component={Home} />
             <Route exact={true} path="/home" component={Home}/>
             <Route exact={true} path="/addQuizz" component={AddQuizz} />
             <Route exact={true} path="/quizz/:id" component={Quizz}/>
             {/* <Route exact={true} path="/quizz/jouer/:id" component={Jouer}/> */}

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
