import React, {Component} from "react";
import {Link} from 'react-router-dom';
<<<<<<< HEAD
//Lvoir les quizzs

function QuizzThumbnail(props) {


=======
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";

function QuizzThumbnail(props) {
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
  return (
    <>
    <div className="QuizzThumbnail">
<<<<<<< HEAD

      <Link  to={'/quizz/'+props.id}>{props.name}</Link>
      {props.picture_url}
=======
      <Link  to={'/quizz/'+props.id}>{props.name}</Link>
      {/* {props.picture_url} */}
      {/* <img src={HTTP_SERVER_PORT_PICTURES + props.picture_url} />             */}
      
>>>>>>> 14aa7facf8a9897856934591312a398f41242837
    </div>
    </>
  );
}

export default QuizzThumbnail;
