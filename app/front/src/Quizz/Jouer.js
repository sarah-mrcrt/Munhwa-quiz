import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";


 function Jouer(props) {
      let [quizz, setQuizz ] = useState(null);
      let [questions, setQuestions ] = useState([]);
      let [answers, setAnswers ] = useState([]);
      let [myAnswer, setMyAnswer ] = useState([]);
      let [score, setScore ] = useState([]);
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
    myAnswer.sort();
    let bonnesReponses = answers.filter(a => a.solution == 1).map(a=> a.id);
    console.log(bonnesReponses, myAnswer);
    if(bonnesReponses.length === myAnswer.length && bonnesReponses.every((value, index) => value === myAnswer[index])) {
      console.log('Gagne');

       let resultat = setScore(questions[current].score);
       // console.log(score);
       console.log(resultat);
    } else {
      console.log('perdu');
    }
    // return bonnesReponses=>[];
    }

function answer(e) {
    e.preventDefault();
}
function checkAnswer(id){
    if(myAnswer.indexOf(id)==-1){
      myAnswer.push(id);
      myAnswer = myAnswer.map(e=>e);
    }else{
    myAnswer =   myAnswer.filter( e=> e!=id)
    }
    setMyAnswer(myAnswer);
}

console.log("zz", props);

if(questions.length == null){
    return 'En cours de oute'
    }
    if(current >= questions.length)
    return (
      <div>C fini{score}
      </div>

    )
   return (
     <div className="Home">
      Bonjour je suis les questions
      <br/> Courage mes petites CSS :*
        <p>{questions[current].sentence} </p>

         {answers.map((item, i) => {
           return(
             <div className={myAnswer.indexOf(item.id) != -1 ? "active" : "" } onClick={e => checkAnswer(item.id)}>{item.sentence}</div>
           )

         })
         }
        <button onClick={e => suivant(e)}>Next</button>
        </div>


   );
 }

 export default Jouer;
