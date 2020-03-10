import React, {useState, useEffect} from "react";
import axios from 'axios';

let idx = 0;

function Quizz (props){
    const [quizzes , setQuizz] = useState([]);

    async function getQuizz() {
        const data = (await axios.get("http://localhost:8000")).data;
        setQuizz(data);
    }
    useEffect(() => {
        getQuizz()
    },[]);

    async function deleteQuizz(e,id){
        e.preventDefault();
        await axios.delete("http://localhost:8000/quizzes" + id);
        getQuizz()
    }

     async function addQuizz(e){
        e.preventDefault();
        console.log("nique");
        let q = {
            id : idx++,
            name : e.target.elements[0].value,
            picture_url : e.target.elements[1].value,
            keywords : e.target.elements[2].value,
            users_id : e.target.elements[3].value
            // score : e.target.elements[3].value
        }
        insertQuizz(q);
    }

    async function insertQuizz(q) {
        await axios.post( "http://localhost:8000", q);
        getQuizz();
    }
    
    return(
            <div className="quizz">
                <h1>Add a new quizz</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> props.addQuizz(e)}>
                    <p><b>Text of the questions</b><input name="questionSentence" required/></p>
                    
                    <p><b>optional video</b><input type="file" id="video" name="video" accept="image/mp4"/></p>

                    <p><b>How many ansewrs</b><input type='number' step="1" min="1" max="10"  name="score" required/></p>

                    <p><b>Keywords</b><input type='text' required/></p>

                    <p><b>Choose the type of your anserw:</b>
                        <div>
                            <input type="radio" id="anserwImages" name="anserw" value="anserwImages"
                                    checked/>
                            <label for="anserwImages">Images</label>
                        </div>
                        <div>
                            <input type="radio" id="anserwSentence" name="anserw" value="anserwSentence"/>
                            <label for="anserwSentence">Sentences</label>
                        </div>
                    </p>

                <div class="questions">
                    <p>
                        <b>Text of the questions</b>
                        <br/>
                        <div>
                            <input name="questionSentence"/> 
                            <label for="correct0">correct</label>
                            <input type="checkbox" id="correct0" name="correct0"/>
                        </div>
                        <div>
                            <input name="questionSentence" required/> 
                            <label for="correct1">correct</label>
                            <input type="checkbox" id="correct1" name="correct1"/>
                        </div>
                        <div>
                            <input type="file" id="image" name="image" accept="image/png, image/jpg"/>
                            <label for="correct1">correct</label>
                            <input type="checkbox" id="correct1" name="correct1"/>
                        </div>
                    </p>
                </div>
                    <p>
                        <input type="number" placeholder="1" step="1" min="1" max="10"/>
                    </p>

                    <div id="buttons">
                        <button type="submit" onClick={e=> props.addQuizz(e)}>Create</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        );
}




export default Quizz;