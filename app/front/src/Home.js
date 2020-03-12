import React,  { useState, useEffect, Component} from "react";
import QuizzThumbnail from "./Quizz/QuizzThumbnail";
import App from "./App.js";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';


 function Home(props) {
      let [quizzes, setQuizzes ] = useState([]);

     async function getQuizzes() {  // The function is asynchronous
      const q = (await axios.get('http://localhost:8000/quizzes')).data;
      setQuizzes(q);
      console.log(q);
  }

      useEffect(() => {
              getQuizzes()
     }, []);

//reverse()
    //  console.log(quizzes);
   return (
     <div className="grid-container">
       {quizzes.reverse().map(q =>
        <QuizzThumbnail  id={q.id} name={q.name} picture={q.picture_url} keywords={q.keywords} />)

       }

     </div>
   );
 }

 export default Home;
