const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const People = require('./data/data');

router
//A la racine j'affiche "Hello world!!"
    .get("/", (req, res) => {
    res.json("Hello world!!");
})
//"http://localhost:8000/persons" J'affiche toutes les personnes de ma BDD
    .get("/persons", (req, res) => {
    res.json(People.getPersons());
})
//"http://localhost:8000/persons" J'affiche UNE personne de ma BDD (grâce à son id)
    .get("/persons/:id",(req,res)=>{
    res.json(People.getPerson(req.params.id));
})
//Insert Person
    .post('/persons',
          (req, res) => {
    const p = People.insertPerson(req.body);
    res.status(201).json(p);
})
//Remove/Delete a person
    .delete('/persons/:id',
            (req, res) => {
    People.removePerson(req.params.id);
    res.status(204).end();
})
//Update a person
    .patch('/persons',
           (req, res) => {
    People.updatePerson(req.body);
    res.status(200).json(req.body);
})
//Error 404
    .use((req, res) => {
    res.status(404);
    res.json({
        error: "Bad request"
    });
})
;

module.exports = router;
