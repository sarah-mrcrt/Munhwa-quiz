import React, {Component} from "react";
<<<<<<< HEAD
=======
// import './App.css';
>>>>>>> f0c5ec65fd1cdc65194776afc3f64ba971bc0389

//Lancer le quiz.

function QuizzThumbnail(quizzes) {
 async function addQuizz(e){
        e.preventDefault();
        let q = {
//            id : idx++,
//            name : e.target.elements[0].value,
//            picture_url : e.target.elements[1].value,
//            keywords : e.target.elements[2].value,
//            users_id : e.target.elements[3].value
        }
        insertQuizz(q);
    }
    
let jsxQuizzes =  quizzes
      .map(q=>
        <QuizzLOL  
              name={q.name}
              picture_url={q.picture_url}
              keywords={q.keywords}
              users_id={q.users_id}
              deleteQuizz={deleteQuizz}/>);

    
  return (
    <div className="QuizzThumbnail">
      QuizzThumbnail
      {quizzes.name}
    </div>
  );
}

export default QuizzThumbnail;
