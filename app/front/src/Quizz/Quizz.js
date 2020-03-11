import React,  { useState, useEffect, Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";

 function Quizz(props) {
    let [quizz, setQuizz ] = useState(null);

     async function getQuizz() {
        const q = (await axios.get('http://localhost:8000/quizz/'+props.match.params)).data;
        setQuizz(q);
     }

      useEffect(() => {
              getQuizz()
     }, []);

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
 }

 export default Quizz;
