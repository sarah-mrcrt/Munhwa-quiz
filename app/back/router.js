const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');

// POST : to insert data
// PUT/PATCH : to modify/replace data.
// GET : to get data.
// DELETE : to delete data.


router
//A la racine j'affiche "Hello world!!"
    .get("/", (req, res) => {
    res.json("Hello world!!");
})
//Tous les quizzes
    .get("/quizzes", 
        (req, res) => {
            db.all( "SELECT * FROM quizzes", (err, rows) => {
                res.json(rows);
            });
    })
//Un quizz
    .get('/quizzes/:id', 
        (req, res) => {
            db.get(
                "SELECT * FROM quizzes WHERE id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
    })
//Inserer un quizz
    .post('/quizzes',
        (req, res) => {
            db.run("INSERT INTO quizzes(name, picture_url, keywords) values(?,?,?)",[name]);
            res.redirect(303, '/quizzes');
        })
//Modifier un quizz
    .patch('/quizzes/:id',
        (req, res) => {
            db.run("UPDATE quizzes set name=? WHERE id=?",[req.body,req.params.id]);
            res.status(200).json(req.body);
    })
//Supprimer un quizz
    .delete('/quizzes/:id', 
        (req, res) => {
            db.run('DELETE FROM quizzes WHERE id=?', [req.params.id]);
            res.redirect(204, "/quizzes");
    })
//Upload une image
    .post('/upload', (req, res) => {
    req.files.file.mv(__dirname + '/public/pictures/' + req.files.file.name,
        (err) => {
            if (err)
            return res.status(500).send(err);
            res.json({file: req.files.file.name});
        }
        );
    })

////////////////////////////////////////////
//get person
    .get('/persons/:id',
    (req, res) => {
        db.get(
            "select * from persons where id=?",
            req.params.id,
            (err, row) => {
                res.json(row)
            }
        );
    })
//inserer une personne
    .post('/persons',
    (req, res) => {
        db.run("insert into persons(name) values(?)",[name]);
        res.redirect(303, '/persons');
    })
//modifer une personne
    .patch('/persons/:id',
    (req, res) => {
        db.run("update persons set name=? where id=?",[req.body,req.params.id]);
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