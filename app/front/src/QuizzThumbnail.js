import React, {Component} from "react";
import './App.css';

function QuizzThumbnail(quizzes) {
  return (
    <div className="QuizzThumbnail">
      QuizzThumbnail
      {quizzes.name}
    </div>
  );
}

export default QuizzThumbnail;
