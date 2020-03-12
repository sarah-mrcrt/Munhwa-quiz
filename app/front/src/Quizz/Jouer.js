import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";


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
  console.log("AA", props.question, sc)
  props.suivant(sc);

  setMyAnswer([]);

}
 return (<div>
   {answers.map((item, i) => {
     console.log(item);
     if(item.sentence != null){
     return(
       <div className={myAnswer.indexOf(item.id) != -1 ? "active" : "" } onClick={e => checkAnswer(item.id)}>{item.sentence}</div>
     )}
      else if (item.picture_url != null) {
        return(
        <img src={HTTP_SERVER_PORT_PICTURES + item.picture_url} />
        )}

   })
   }
   <button onClick={e => suivant(e)}>Next</button>

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


function suivant(sc) {

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
      <div>C fini {score}
      </div>

    )
   return (
     <div className="Home">
      Bonjour je suis les questions
      <br/> Courage mes petites CSS 😗
        <p>{questions[current].sentence} </p>
          {score}
          <Reponses question = {questions[current]} suivant = {suivant}/>
        </div>


   );
 }

 export default Jouer;