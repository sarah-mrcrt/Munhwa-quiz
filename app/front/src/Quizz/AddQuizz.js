import React, {useState, useEffect, Redirect} from "react";
import axios from 'axios';
import { HTTP_SERVER_PORT, HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT_VIDEOS} from "../constantes";
// import { Redirect } from 'react-router-dom';

function Quizz (props){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

    // Partie redirection
    function redirection() {
        setRed(true);
    }
    const [red, setRed] = useState(false);
   
    // Partie création d'un quizz
    const [ quizzes, setQuizz] = useState([]);
    async function getQuizz() {
        const data = (await axios.get(HTTP_SERVER_PORT)).data;
        setQuizz(data);
    }
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
        data.append('file', selectedFile, selectedFile.name);
        axios.post(HTTP_SERVER_PORT + "uploadIcon", data).then(res => console.log("Res", res));
        console.log(e.target);
        //Upload sur le serveur
        let q = {
            name : e.target.elements[0].value,
            picture_url :selectedFile.name,
            keywords : e.target.elements[2].value,
        }
        insertQuizz(q);
    }
    async function insertQuizz(q) {
        await axios.post( HTTP_SERVER_PORT + "quizzes", q);
        getQuizz();
    }

    // Partie création de questions
    if (red) 
        return (
            <addQuestions/>   
        )
        return(
        <>
                {/* {cities.map(c =>
                    <li key={c.id}>{c.id} : {c.cityname}</li>
                )} */}
            <div className="quizz">
                <h1>Add a new quizz</h1>
                <br/>
                <form id='formQuizz' action="#" onSubmit={e=> addQuizz(e)}>
                <p><b>Nom du quizz</b><input name="name" required/></p>
                <b>Icone</b><input type="file" name="picture_url" accept="image/*" required/>
                <p><b>keywords</b><input name="keywords" placeholder="; entre chaque keywords"/></p>

                <button type="submit" onClick={ e => redirection()}>Envoyez</button>
                </form>
            </div>
        </>
        )
   

}

export default Quizz;
