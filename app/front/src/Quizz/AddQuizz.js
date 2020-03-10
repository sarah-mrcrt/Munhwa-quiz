import React, {useState, useEffect} from "react";
import axios from 'axios';
import {HTTP_SERVER_PORT} from "../constantes";

function Quizz (props){
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

    const [quizzes , setQuizz] = useState([]);

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
        console.log(e.target);
        let q = {
            name : e.target.elements[0].value,
            picture_url : e.target.elements[1].value,
            keywords : e.target.elements[2].value,
        }
        insertQuizz(q);
    }

    async function insertQuizz(q) {
        await axios.post( HTTP_SERVER_PORT+"quizzes", q);
        getQuizz();
    }

    return(
        <>
                {/* {cities.map(c => 
                    <li key={c.id}>{c.id} : {c.cityname}</li>
                )} */}

            <div className="quizz">
                <h1>Add a new quizz</h1>
                <br/>
                <form id='formQuizz' action="#" onSubmit={e=> addQuizz(e)}>
                <p><b>Nom du quizz</b><input name="name" /></p>
                {/* <p><b>Icône</b><input name="picture_url" /></p> */}
                <p><b>Icone</b><input type="file" id="picture_url" name="picture_url" accept="image/png, image/jpg"/></p>
                <p><b>keywords</b><input name="keywords" placeholder="; entre chaque keywords"/></p>

                <button type="submit">Envoyez</button>
                </form>
            </div>
        </>
        )
}

export default Quizz;