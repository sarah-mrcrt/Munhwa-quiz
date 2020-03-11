import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";


 function Jouer(props) {
      let [quizz, setQuizz ] = useState(null);
      let [questions, setQuestions ] = useState([]);
      let [answers, setAnswers ] = useState([]);
      const [current, setCurrent] = useState(0);

     async function getQuizz() {  // The function is asynchronous
                 const q = (await axios.get(HTTP_SERVER_PORT +'quizzes/'+props.match.params.id)).data;
                 setQuizz(q);
             }
     async function getQuestions() {  // The function is asynchronous
                 const qt = (await axios.get(HTTP_SERVER_PORT +'questions/'+props.match.params.id)).data;
                 setQuestions(qt);
             }
     async function getAnswers() {
                  const aw = (await axios.get(HTTP_SERVER_PORT +'answers/'+props.match.params.id)).data;
                  setAnswers(aw);
     }
      useEffect(() => {
              getQuizz();
              getQuestions();
              getAnswers();
     }, []);

function suivant(e) {
    e.preventDefault();
    setCurrent(current+1);
}
function answer(e) {
    e.preventDefault();


}
console.log("zz", props);

if(questions.length == null){
    return 'En cours de oute'
    }
    if(current >= questions.length)
    return (
      <div>C fini</div>
    )
   return (
     <div className="Home">
      Bonjour je suis les questions {props.match.params.id}
      <br/>BONJOUR J'AIMERAIS AFFICHER LES QUESTIONS!!!!!!!
        <p>{questions[current].sentence} </p>
        <li onClick={(e) => answer(e)}>{}</li>

        <button onClick={e => suivant(e)}>Next</button>
        </div>


   );
 }

 export default Jouer;