// créer une question de quizz
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";
import { Redirect } from 'react-router-dom';
import Home from "../Home.js";

function Questions (props){
    // Partie Redirection
    function redirection() {
       setRed(false);
    }
    const [red, setRed] = useState(true);


    // Partie Bouttons radios
   const [checkAnswersType, setAnswersType] = useState(true);
    function afficherAnswersType(e){
        e.preventDefault();
        if (e.target.name == 'setImage'){
            setImage = true;
            setSentence = false;
        }
        if (e.target.name == 'setSentence'){
            setImage == true;
            setSentence == false;
        }
    }
    
    function  diplayImagesOrSentences() {
        if (checkAnswersType == setImage) {
            return(
                <>
                <div>
                    <input type="file" name="setImage" accept="image/png, image/jpg"/>
                    <label for="correct1">correct</label>
                    <input type="checkbox" id="correct1" name="correct1"/>
                </div>
                </>
            )
        }
        if(checkAnswersType == setSentence){
            return(
            <>
            <div>
                <input name="setSentence"/> 
                <label for="correct0">correct</label>
                <input type="checkbox" id="correct0" name="correct0"/>
            </div>
            </>
            )
        }
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
        console.log(e.target);
        // if(video_url != null) {
        //     const selectedFile = e.target.picture_url.files[0];
        //     const data = new FormData();
        //     data.append('file', selectedFile, selectedFile.name);
        //     axios.post(HTTP_SERVER_PORT + "uploadVideo", data).then(res => console.log("Res", res));
        // }
        let q = {
            sentence : e.target.elements[0].value,
            video_url : e.target.elements[1].value,
            score : e.target.elements[2].value,
        }
        insertQuestions(q);
    }

    async function insertQuestions(q) {
        await axios.post( HTTP_SERVER_PORT+"questions", q);
        getQuestions();
    }
    
    // handleOptionChange: function (changeEvent) {
    //     this.setState({
    //         selectedOption: changeEvent.target.value
    // })

    // if (checkAnswersType == image) 
        return(
            <div className="quizz">
                <h1>Add a new question</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> addQuestions(e)}>
                    <p><b>Text of the questions</b><input name="sentence" /></p>
                    
                    <p><b>optional video</b><input type="file" name="video_url" accept="video/*"/></p>

        
                    <p><b>Choose the type of your anserw:</b>
                        <div>
                            <input type="radio" id="anserwImages" name="anserw" value="anserwImages" onChange={e=> afficherAnswersType(e)} />
                            <label for="anserwImages">Images</label>
                        </div>
                        <div>
                            <input type="radio" id="anserwSentence" name="anserw" value="anserwSentence"  onChange={e=> afficherAnswersType(e)}/>
                            <label for="anserwSentence">Sentences</label>
                        </div>
                    </p>

                    {diplayImagesOrSentences()}

                   {/* <p><b>How many ansewrs</b><input type='number' step="1" min="1" max="10"  name="score" /></p>
                    
                <div class="questions">
                    <p>
                         <b>Text of the questions</b>
                        <br/>
                         if(radio.anserw)

  

                    </p>
                </div> 
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