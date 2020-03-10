import React, {Component} from "react";
//Lvoir les quizzs

function QuizzThumbnail(props) {
     

  return (
    <div className="QuizzThumbnail">
      
      {props.quiz.name}
    </div>
  );
}

export default QuizzThumbnail;
