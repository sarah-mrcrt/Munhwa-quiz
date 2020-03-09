import React, {Component} from "react";
import './App.css';

//Lancer le quiz.

function QuizzThumbnail(quizzes) {
  return (
    <div className="QuizzThumbnail">
      QuizzThumbnail
      {quizzes.name}
    </div>
  );
}

export default QuizzThumbnail;
