import React,  { useState, useEffect, Component} from "react";
import QuizzThumbnail from "./Quizz/QuizzThumbnail";
import App from "./App.js";
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
<<<<<<< HEAD

     </div>
   );
 }

 export default Home;
=======
     </div>
   );
 }

 export default Home;
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
