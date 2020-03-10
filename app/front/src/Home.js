import React,  { useState, useEffect, Component} from "react";
import logo from './logo.svg';
// import './App.css';
import QuizzThumbnail from "./Quizz/QuizzThumbnail";
// import App from "./App.js";
// import About from "./About.js";
// import {BrowserRouter, Switch, Route, Link} from "react-router-dom";


function Home() {
     let [quizzes, setQuizzes ] = useState([]);
    
    async function getQuizzes() {  // The function is asynchronous
                const q = (await axios.get('http://localhost:8000/quizzes')).data; 
                setQuizzes(q);
            }

     useEffect(() => { // this is a hook called everytime the function is rendered again  // import useEffect
             getQuizzes()
    }, []);



  return (
    <div className="Home">
       <QuizzThumbnail quiz={q} />
    </div>
  );
}

export default Home;
