// créer une question de quizz
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";
import { Redirect } from 'react-router-dom';

function Questions (props){
    const [questions , setQuestions] = useState([]);
    // const [anserws , setAnserws] = useState([]);
    
    function redirection() {
       setRed(false);
   }
    const [red, setRed] = useState(true);

    //RadioButtun
    const [checked, setChecked] = useState(true);

    // Partie Questions
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

    if (red) 
        // return (
        //     <addQuestions />    
        // )
 
        return(
            <div className="quizz">
                <h1>Add a new question</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> addQuestions(e)}>
                    <p><b>Text of the questions</b><input name="sentence" /></p>
                    
                    <p><b>optional video</b><input type="file" name="video_url" accept="video/*"/></p>

        
                    <p><b>Choose the type of your anserw:</b>
                        <div>
                            <input type="radio" id="anserwImages" name="anserw" value="anserwImages" checked />

                        {/* ={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} */}
                            <label for="anserwImages">Images</label>
                        </div>
                        <div>
                            <input type="radio" id="anserwSentence" name="anserw" value="anserwSentence"/>
                            <label for="anserwSentence">Sentences</label>
                        </div>
                    </p>



                    <p><b>How many ansewrs</b><input type='number' step="1" min="1" max="10"  name="score" /></p>
                    
                <div class="questions">
                    <p>
                        {/* <b>Text of the questions</b>
                        <br/>
                         if(radio.anserw)

                        <div>
                            <input name="questionSentence"/> 
                            <label for="correct0">correct</label>
                            <input type="checkbox" id="correct0" name="correct0"/>
                        </div>
  
                        <div>
                            <input type="file" id="image" name="image" accept="image/png, image/jpg"/>
                            <label for="correct1">correct</label>
                            <input type="checkbox" id="correct1" name="correct1"/>
                        </div> */}
                    </p>
                </div>
                    <p>
                        <input type="number" placeholder="1" step="1" min="1" max="10"/>
                    </p>

                    <div id="buttons">
                        <button type="submit">Create</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        );
}

export default Questions;