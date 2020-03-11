import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";


 function Jouer(props) {
      let [quizz, setQuizz ] = useState(null);
      let [questions, setQuestions ] = useState([]);
      const [current, setCurrent] = useState(0);

     async function getQuizz() {  // The function is asynchronous
                 const q = (await axios.get(HTTP_SERVER_PORT +'quizzes/'+props.match.params.id)).data;
                 setQuizz(q);
             }
     async function getQuestions() {  // The function is asynchronous
                 const qt = (await axios.get(HTTP_SERVER_PORT +'questions/'+props.match.params.id)).data;
                 console.log("aa", props);

                 setQuestions(qt);
             }

      useEffect(() => {
              getQuizz();
              getQuestions();
     }, []);

console.log("zz", props);

if(questions.length == 0){
    return 'En cours de chargement'
    }
   return (
     <div className="Home">
      Bonjour je suis les questions {props.match.params.id}
      <br/>BONJOUR J'AIMERAIS AFFICHER LES QUESTIONS!!!!!!!
        <p>{questions[current].sentence} </p>

        
     </div>
   );
 }

 export default Jouer;
