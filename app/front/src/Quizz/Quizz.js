import React,  { useState, useEffect, Component} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

 function Quizz(props) {
    let [quizz, setQuizz ] = useState(null);

     async function getQuizz() {
        const q = (await axios.get('http://localhost:8000/quizz/'+props.match.params)).data;
        setQuizz(q);
     }

      useEffect(() => {
              getQuizz()
     }, []);
console.log("zz", props);
if(quizz==null){
  return <div>Chargement</div>
}
   return (
     <div className="Home">
      Bonjour je suis le quiz {props.match.params.id}

     </div>
   );
 }

 export default Quizz;
