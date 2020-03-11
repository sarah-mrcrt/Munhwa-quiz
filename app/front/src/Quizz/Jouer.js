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
      Bonjour je suis les questions
      <br/> Courage mes petites CSS 😗
        <p>{questions[current].sentence} </p>
<<<<<<< HEAD
<<<<<<< HEAD
        <li onClick={(e) => answer(e)}>{}</li>

=======
=======
>>>>>>> 20fa36608133deb8f430d8fa1dd9a78ef7c9ebf0
        // <li onClick={(e) => answer(e)}>{answers.sentence}</li>
         <li> {answers.sentence } {console.log(answers)} </li>
         {answers.map((item, i) => {
           return(
             <li>{item.sentence}</li>
           )

         })
         }
<<<<<<< HEAD
>>>>>>> 079c190e4dfc992f331b983eddb1ce4e5f8d11a5
=======
>>>>>>> 20fa36608133deb8f430d8fa1dd9a78ef7c9ebf0
        <button onClick={e => suivant(e)}>Next</button>
        </div>


   );
 }

 export default Jouer;