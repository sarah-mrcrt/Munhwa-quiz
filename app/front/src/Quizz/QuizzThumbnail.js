import React, {Component} from "react";
import {Link} from 'react-router-dom';
//Lvoir les quizzs

function QuizzThumbnail(props) {


  return (
    <div className="QuizzThumbnail">

      <Link  to={'/quizz/'+props.id}>{props.name}</Link>
      {props.picture_url}
    </div>
  );
}

export default QuizzThumbnail;
