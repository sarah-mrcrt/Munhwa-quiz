// créer une question de quizz
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";
import { Redirect } from 'react-router-dom';
import Home from "../Home.js";

function Qs(props) {
    if (props.sentenceType == true) {
            return(
                <>
                <div>
                    <input name="sentences[]"/> 
                    <label >correct</label>
                    <input type="checkbox"  name="correct[]"/>
                </div>
                </>
            )
        }
        if(props.sentenceType == false){
            return(
            <>
            <div>
                    <input type="file" name="image[]" accept="image/png, image/jpg" required/>
                    <label>correct</label>
                    <input type="checkbox"  name="correct[]"/>
            </div>
            </>
            )
        }
}

function Questions (props){
    // Partie Redirection
    // function redirection() {
    //    setRed(false);
    // }
    // const [red, setRed] = useState(true);


    // Partie Bouttons radios
    const [sentenceType, setSentenceType] = useState(true);
    // const [anserws, setAnserws] = useState([1]);

    function afficherAnswersType(e, type){
        e.preventDefault();
        setSentenceType(type)
    }

    // function ajouterAnserws(e){
    //     e.preventDefault();
    //     setAnserws()
    // }
    function  diplayImagesOrSentences() {
        return(
            <div>
                <Qs sentenceType={sentenceType} />
                <Qs sentenceType={sentenceType} />
                <Qs sentenceType={sentenceType} />
                <Qs sentenceType={sentenceType} />
            </div>
        )
    }

    // Partie Questions
    const [questions , setQuestions] = useState([]);
    
    async function getQuestions() {
        const data = (await axios.get(HTTP_SERVER_PORT )).data;
        setQuestions(data);
    }
    useEffect(() => {
        getQuestions()
    },[]);

    const [answers , setAnswers] = useState([]);
    async function getAnswers() {
        const data = (await axios.get(HTTP_SERVER_PORT)).data;
        setAnswers(data);
    }
    useEffect(() => {
        getAnswers()
    },[]);

     async function addQuestions(e){
         e.preventDefault();
        let sentence = e.target.elements['question[]'].value;
        let score = e.target.elements['score[]'].value;
        //Upload Vidéo
        const selectedFile = e.target.video_url.files[0];
        
        // Je sauve l'id de la question  
        let idQuizz = (await axios.get(HTTP_SERVER_PORT+"maxidquizzes")).data.nb;
        console.log('f'+selectedFile);
        if(selectedFile==undefined) {
            let q = {
                sentence : sentence,
                video_url : '',
                score : score,
                quizzes_id: idQuizz
            }   
            insertQuestions(q)
        }
        if(selectedFile!==undefined) {
            const data = new FormData();
            data.append('file', selectedFile, selectedFile.name);
            axios.post(HTTP_SERVER_PORT + "uploadVideo", data).then(res => console.log("Res", res));
            let video = selectedFile.name;
                let q = {
                sentence : sentence,
                video_url : video,
                score : score,
                quizzes_id: idQuizz
            } 
            insertQuestions(q)
        }

        // Ajouter Réponses
        let idQuestion = (await axios.get(HTTP_SERVER_PORT+"maxidquestion")).data.nb;
        let sentences = e.target.elements['sentences[]'];
        let correct = e.target.elements['correct[]'];
        for(let i = 0; i < 4 ; i++) {
            let sentences = e.target.elements['sentences[]'];
            //console.log(sentences[i].value, correct[i].checked);
             let sol = correct[i].checked ? 1 : 0;
             let q = {
                sentence : sentences[i].value,
                picture_url : "",
                solution : sol,
                question_id: idQuestion
            }
            insertAnswers(q);
        }
        
    }
        async function insertAnswers(q) {
            await axios.post( HTTP_SERVER_PORT + "answers", q).data;
            getAnswers();
    }
        async function insertQuestions(q) {
        await axios.post( HTTP_SERVER_PORT+ "questions", q).data;
        getQuestions();
    }

      let checkImage = sentenceType === false ? "true" : "false";
      let checkSentence = sentenceType === true ? "true" : "false";
      
        return(
            <div className="quizz">
                <h1>Add a new question</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> addQuestions(e)}>
                    <p><b>Text of the questions</b><input name="question[]" /></p>
                    
                    <p><b>optional video</b><input type="file" name="video_url" accept="video/*"/></p>

        
                    <p><b>Choose the type of your anserw:</b>
                        <div>
                            <input type="radio" name="picture_url" 
                            checked={checkImage}
                            value="anserwImages" 
                            onChange= {e=> afficherAnswersType(e,false)} />
                            <label for="picture_url">Images</label>
                        </div>
                        <div>
                        
                            
                            <input type="radio" name="sentence"
                            checked={checkSentence}
                             onChange={e=> afficherAnswersType(e, true)}/>
                            <label for="sentence">Sentences</label>
                        </div>
                    </p>
                    {diplayImagesOrSentences()}
                    <p><b>How many points</b><input type='number' step="1" min="1" max="10"  name="score[]"/></p>
                    <div id="buttons">
                        <button type="submit">Create your question</button>
                    </div>
                </form>
            </div>
        )
        return (
            <Home/>    
        )
}

export default Questions;