import React,  { useState, useEffect, Component} from "react";
// import './App.css';
import { Link} from "react-router-dom";
import axios from 'axios';

 function Jouer(props) {
      let [question, setQuestion ] = useState([]);
      const [current, setCurrent] = useState(0);

     async function getJouer() {  // The function is asynchronous
                 const q = (await axios.get('http://localhost:8000/quizz/jouer/id')).data;

                 setQuestion(q);

             }

      useEffect(() => {
              getJouer()
     }, []);

console.log("zz", props);
   return (
     <div className="Home">
      Bonjour je suis les questions {props.match.params.sentence}
      Bonjour je suis le quiz {props.match.params.id}

     </div>
   );
 }

 export default Jouer;
