import React, {Component} from "react";
import './App.css';
//Présenter succinctement un quizz. Cliquez quelque part dans ce composant pour lancer le quiz.

function QuizzThumbnail(quizzes) {
  return (
    <div className="QuizzThumbnail">
      QuizzThumbnail
      {quizzes.name}
    </div>
  );
}

export default QuizzThumbnail;
