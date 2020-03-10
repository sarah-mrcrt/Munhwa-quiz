import React,  { useState, useEffect, Component} from "react";
import logo from './logo.svg';
// import './App.css';
import QuizzThumbnail from "./Quizz/QuizzThumbnail";
import App from "./App.js";
import About from "./About.js";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

 function Home() {
      let [quizzes, setQuizzes ] = useState([]);

     async function getQuizzes() {  // The function is asynchronous
                 const q = (await axios.get('http://localhost:8000/quizzes')).data;
                 setQuizzes(q);
                console.log(q);
             }

      useEffect(() => {
              getQuizzes()
     }, []);


     console.log(quizzes);
   return (
     <div className="Home">
       {quizzes.map(q =>
        <QuizzThumbnail id={q.id} name={q.name} picture={q.picture_url} keywords={q.keywords} />)
       }

     </div>
   );
 }

 export default Home;
