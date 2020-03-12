import React, {Component} from "react";
import {Link} from 'react-router-dom';
//Lvoir les quizzs
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";


function QuizzThumbnail(props) {
  return (
    <>
    <div className="card">

      

    <Link to={'/quizz/'+props.id}> <img  className="photo_quizz" src={HTTP_SERVER_PORT_PICTURES + props.picture} /> </Link>
      {/* {props.picture_url} */}
      {/* <img src={HTTP_SERVER_PORT_PICTURES + props.picture_url} />             */}
      <Link className="name_quizz" to={'/quizz/'+props.id}>{props.name}</Link>
    </div>
    </>
  );
}

export default QuizzThumbnail;
