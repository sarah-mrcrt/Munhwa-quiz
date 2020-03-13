import React, {useState, useEffect, Redirect} from "react";
import axios from 'axios';
import AddQuestion from './AddQuestion.js';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";
// import { Redirect } from 'react-router-dom';

function Quizz (props){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

    // // Partie redirection
    // function redirection() {
    //     setRed(true);
    // }
     const [red, setRed] = useState(false);
   
    // Partie création d'un quizz
    const [ quizzes, setQuizz] = useState([]);
    async function getQuizz() {
        const data = (await axios.get(HTTP_SERVER_PORT)).data;
        setQuizz(data);
    }
    //Initialization
    useEffect(() => {
        getQuizz()
    },[]);
    async function deleteQuizz(e,id){
        e.preventDefault();
        await axios.delete(HTTP_SERVER_PORT + "quizzes" + id);
        getQuizz()
    }
    
    async function addQuizz(e){
        e.preventDefault();
        //Upload d'image
        console.log(e.target.picture_url);
        const selectedFile = e.target.picture_url.files[0];
        console.log(e.target.picture_url.files[0]);
        const data = new FormData();
        if(selectedFile!==undefined) {
            data.append('file', selectedFile, selectedFile.name);
            axios.post(HTTP_SERVER_PORT + "uploadIcon", data).then(res => console.log("Res", res));
            console.log(e.target);
            let q = {
                name : e.target.elements[0].value,
                picture_url : selectedFile.name,
                keywords : e.target.elements[2].value,
            }
            //recover fields 
            insertQuizz(q);

        }else{
            let q = {
                name : e.target.elements[0].value,
                picture_url : 'iconDefault.jpg',
                keywords : e.target.elements[2].value,
            }
            insertQuizz(q); 
        }
        setRed(true);
    }
    async function insertQuizz(q) {
        //server
        let qid = await axios.post( HTTP_SERVER_PORT + "quizzes", q).data;
        getQuizz();
    }

    // Partie création de questions
    if (red) 
        return (
        <>
            <AddQuestion/>
        </>
        )
        return(
        <>
                {/* {cities.map(c =>
                    <li key={c.id}>{c.id} : {c.cityname}</li>
                )} */}
            <div className="add_quizz">
                {/* <h2>Add a new quizz</h2> */}
                <form id='formQuizz' action="#" onSubmit={e=> addQuizz(e)}>
                <br/><b>Quizz Name</b>
                <input placeholder="Quizz name" name="name" required/>
                <br/><b>Icon</b><input type="file" name="picture_url" accept="image/*"/>
                <p><b>keywords</b><br/><input name="keywords" placeholder="keywords separated by ;"/></p>

                <button type="submit"  >Envoyez</button>
                </form>
            </div>
        </>
        )

}

export default Quizz;
