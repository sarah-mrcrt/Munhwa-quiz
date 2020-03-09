import React, {useState, useEffect} from "react";
// import axios from 'axios';

function AddQuizz (props){
    if(props.display == false)
        return null;
    return(
            <div className="quizz">
                <h1>Add a new quizz</h1>
                <br/>
                <form id='formadd' action="#" onSubmit={e=> props.addPerson(e)}>
                    <p><b>Text of the questions</b><input name="questionSentence" required/></p>
                    
                    <p><b>optional video</b><input type="file" id="video" name="video" accept="image/mp4"/></p>

                    <p><b>How many ansewrs</b><input type='number' step="1" min="1" max="10"  name="score" required/></p>

                    <p><b>Keywords</b><input type='text'/></p>

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
                            <input name="questionSentence"/> 
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
                        <button type="submit">Create</button>
                        <button id="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        );
}


function QuizzLOL(props){
    // const [minimumScore, setMinimumScore] = useState(0);
    async function addPerson(e){
        e.preventDefault();
        let p = {
            id : idx++,
            firstname : e.target.elements[0].value,
            lastname : e.target.elements[1].value,
            avatar : e.target.elements[2].value,
            score : e.target.elements[3].value
        }
        insertPerson(p);
    }
}

export default QuizzLOL;
