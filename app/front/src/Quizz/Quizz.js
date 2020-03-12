import React,  { useState, useEffect, Component} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';
// import './App.css';
import Jouer from "./Jouer";
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";

 function Quizz(props) {
    let [quizz, setQuizz ] = useState(null);

     async function getQuizz() {
        const q = (await axios.get(HTTP_SERVER_PORT +'quizzes/'+props.match.params.id)).data;
        console.log(q);
        setQuizz(q);
     }

      useEffect(() => {
              getQuizz()
     }, []);


// if(quizz==null){
//   return <div>Chargement</div>
// }


if(quizz == null){
    return 'En cours de chargement'
    }
   return (
     <div className="start_quizz">
    
        <img src={HTTP_SERVER_PORT_PICTURES + quizz.picture_url} />
        <Link className="play" to={'/Jouer/'+props.match.params.id}>Commencer</Link>

      </div>
   );

 }

 export default Quizz;
