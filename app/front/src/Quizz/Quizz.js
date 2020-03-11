import React,  { useState, useEffect, Component} from "react";
<<<<<<< HEAD
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
=======
import { Link } from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";

 function Quizz(props) {
    let [quizz, setQuizz ] = useState(null);

     async function getQuizz() {
        const q = (await axios.get('http://localhost:8000/quizz/'+props.match.params)).data;
        setQuizz(q);
     }
>>>>>>> 14aa7facf8a9897856934591312a398f41242837

      useEffect(() => {
              getQuizz()
     }, []);

<<<<<<< HEAD

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

=======
     async function deleteQuizz(e,id){
        e.preventDefault();
        await axios.delete(HTTP_SERVER_PORT + "quizzes" + id);
        getQuizz()
    }

console.log("zz", props);
if(quizz!=null){
  return <div>Chargement</div>
}
   return (
     <div className="Home">
      Bonjour je suis le quiz {props.match.params.id}
      <form id='formQuizz' action="#" onSubmit={e=> deleteQuizz(e)}>
        <button type="submit">supp</button>
      </form>

     </div>
   );
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
 }

 export default Quizz;
