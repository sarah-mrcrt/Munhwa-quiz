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
                    <input type="file" name="image[]" accept="image/png, image/jpg"/>
                    <label >correct</label>
                    <input type="checkbox"  name="correct[]"/>
            </div>
            </>
            )
        }
}

function Questions (props){
    // Partie Redirection
    function redirection() {
       setRed(false);
    }
    const [red, setRed] = useState(true);


    // Partie Bouttons radios
    const [sentenceType, setSentenceType] = useState(true);
    const [anserws, setAnserws] = useState([1]);

    function afficherAnswersType(e, type){
        e.preventDefault();
        setSentenceType(type)
    }

    function ajouterAnserws(e){
        e.preventDefault();
        setAnserws()
    }
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
        const data = (await axios.get(HTTP_SERVER_PORT)).data;
        setQuestions(data);
    }
    useEffect(() => {
        getQuestions()
    },[]);
     async function addQuestions(e){
        e.preventDefault();
        
        let sentences = e.target.elements['sentences[]'];
        let correct = e.target.elements['correct[]'];
        console.log(sentences);
        for(let i = 0; i < 4 ; i++) {
            console.log(sentences[i].value, correct[i].checked);
        }

        let idQ = (await axios.get(HTTP_SERVER_PORT)).data;
        console.log(idQ +'oute');
        
        // if(video_url != null) {
        //     const selectedFile = e.target.picture_url.files[0];
        //     const data = new FormData();
        //     data.append('file', selectedFile, selectedFile.name);
        //     axios.post(HTTP_SERVER_PORT + "uploadVideo", data).then(res => console.log("Res", res));
        // }
        /*let q = {
            sentence : e.target.elements[0].value,
            video_url : e.target.elements[1].value,
            score : e.target.elements[2].value,
        }
        insertQuestions(q);
    */
    }

    async function insertQuestions(q) {
        await axios.post( HTTP_SERVER_PORT+"questions", q);
        getQuestions();
    }

      let checkImage = sentenceType === false ? "true" : "false";
      let checkSentence = sentenceType === true ? "true" : "false";
      
        return(
            <div className="quizz">
                <h1>Add a new question</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> addQuestions(e)}>
                    <p><b>Text of the questions</b><input name="sentence" /></p>
                    
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

                    <p><b>How many ansewrs</b><input type='number' step="1" min="1" max="10"  name="score" onChange={e=> ajouterAnserws(e)}/></p>
                    {diplayImagesOrSentences()}

                   {/* 
                    <p>
                        <input type="number" placeholder="1" step="1" min="1" max="10"/>
                    </p>
                */}
                    <div id="buttons">
                        <button type="submit">Create</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        )
        return (
            <Home/>    
        )
}

export default Questions;