import React,  { useState, useEffect, Component} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
// import './App.css';
import Jouer from "./Jouer";


 function Quizz(props) {
      let [quizz, setQuizz ] = useState([]);

     async function getQuizz() {  // The function is asynchronous
                 const q = (await axios.get('http://localhost:8000/quizzes/'+props.match.params.id)).data;
                 setQuizz(q);

             }

      useEffect(() => {
              getQuizz()
     }, []);


// if(quizz==null){
//   return <div>Chargement</div>
// }


  if(quizz.length == 0){
    return 'En cours de chargement'
    }
   return (
     <div className="Home">
      Bonjour je suis le quiz {props.match.params.id}

        <Link  to={'/Jouer'}>Jouer</Link>

      </div>



   );

 }

 export default Quizz;
