import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";

let totalPossible =0;

function Reponses(props) {
      let [answers, setAnswers ] = useState([]);
      let [myAnswer, setMyAnswer ] = useState([]);

      let idQ = props.question.id;
      async function getAnswers() {
               const aw = (await axios.get(HTTP_SERVER_PORT +'answers/'+idQ)).data;
                 setAnswers(aw);
      }

      useEffect(() => {
              getAnswers();
     }, [idQ]);

    if(answers.length ==0)
    return (<div>Chargement</div>)
     function checkAnswer(id){
         if(myAnswer.indexOf(id)==-1){
           myAnswer.push(id);
           myAnswer = myAnswer.map(e=>e);
         }else{
         myAnswer =   myAnswer.filter( e=> e!=id)
         }
         setMyAnswer(myAnswer);
     }

    function suivant(e) {
      e.preventDefault();
      myAnswer.sort();
      let sc = 0;
      let bonnesReponses = answers.filter(a => a.solution == 1).map(a=> a.id);
      console.log(bonnesReponses, myAnswer)
      if(bonnesReponses.length === myAnswer.length && bonnesReponses.every((value, index) => value === myAnswer[index])) {
        sc =  props.question.score;
      }
      // else {
      //   scoretotal = props.question.score;
      // }
      console.log("AA", props.question, sc)
      props.suivant(sc);
      totalPossible = totalPossible+ props.question.score;

      setMyAnswer([]);

    }
     return (<div className="div-grid">
       {answers.map((item, i) => {
         console.log(item);
         if(item.sentence != null){
         return(
           <div className="card">
           <div className={myAnswer.indexOf(item.id) != -1 ? "active" : "" } onClick={e => checkAnswer(item.id)}>{item.sentence}</div>
           </div>
         )}
          else if (item.picture_url != null) {
            return(
              <div className="card">
            <img src={HTTP_SERVER_PORT_PICTURES + item.picture_url} className={myAnswer.indexOf(item.id) != -1 ? "active" : "" } onClick={e => checkAnswer(item.id)} />
            </div>
            )}


       })
       }
       <button className="next_button" onClick={e => suivant(e)}>Next</button>

     </div>)
}


 function Jouer(props) {
      let [quizz, setQuizz ] = useState(null);
      let [questions, setQuestions ] = useState([]);
      const [score, setScore ] = useState(0);
      const [current, setCurrent] = useState(0);
      useEffect(() => {
              getQuizz();
              getQuestions();
              totalPossible=0;

     },[]);
      if(questions.length ==0)
      return (<div>Chargement</div>)


     async function getQuizz() {  // The function is asynchronous
                 const q = (await axios.get(HTTP_SERVER_PORT +'quizzes/'+props.match.params.id)).data;
                 setQuizz(q);
             }
     async function getQuestions() {  // The function is asynchronous
                 const qt = (await axios.get(HTTP_SERVER_PORT +'questions/'+props.match.params.id)).data;
                 setQuestions(qt);
             }


function suivant(sc, scoretotal) {

    setScore(score+sc);
    setCurrent(current+1);
    }

function answer(e) {
    e.preventDefault();
}


console.log("zz", score);

if(questions.length == 0){
    return 'En cours de oute'
    }
    if(current >= questions.length)
    return (
      <div className="div-score">
       <h3> Score </h3>
      <p className="resultat">{score}/{totalPossible}</p>
      </div>

    )
    if(questions[current].video_url != null){
       return( <> <video controls autoplay="true" loop src={HTTP_SERVER_PORT_VIDEOS + questions[current].video_url} > super</video>
       <p></p>
       <p className="question">{questions[current].sentence}  </p>
        <p className="score">Score : {score} </p>

        <Reponses question = {questions[current]} suivant = {suivant}/>
        </>);

    }
   return (
      <>
         <p className="question">{questions[current].sentence}  </p>
          <p className="score">Score : {score} </p>

          <Reponses question = {questions[current]} suivant = {suivant}/>
        </>
   );

 }

 export default Jouer;
