const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');
const verify=require('./connectionRouter').verify;

router
//A la racine j'affiche "Hello world!!"
    .get("/", (req, res) => {
    res.json("Hello world!!");
})
//Tous les quizzes
    .get("/quizzes",
        (req, res) => {
            db.all( "SELECT * FROM quizzes", (err, rows) => {
                console.log(rows);
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
                    console.log(row);
                    console.log(err);
                    res.json(row)
                }
            );
    })
//Inserer un quizz
    .post('/quizzes',
        (req, res) => {
            console.log('Quizz');
            const q = req.body;
            db.run("INSERT INTO quizzes(name, picture_url, keywords) values(?,?,?)",[q.name, q.picture_url, q.keywords]);
            res.redirect(303, '/quizzes');
        })
    // .get("/cities", verify, (req, res) => {
    //     db.all('select * from city',
    //         (err, rows) => {
    //             if (err) {
    //                 console.log("err : ", err);
    //                 res.status(500).end();
    //             }else{
    //                 res.status(200).json(rows);
    //             }
    //         }
    //     );
    // })
//Modifier un quizz
    .patch('/quizzes/:id',
        (req, res) => {
            db.run("UPDATE quizzes set name=? WHERE id=?",[req.body,req.params.id, req.body,req.params.name]);
            res.status(200).json(req.body);
    })
//Supprimer un quizz
    .delete('/quizzes/:id',
        (req, res) => {
            db.run('DELETE FROM quizzes WHERE id=?', [req.params.id]);
            res.redirect(204, "/quizzes");
    })
//Upload l'icône du quizz
    .post('/upload', 
        (req, res) => {
        console.log("toto",req.files);
        req.files.file.mv(__dirname + '/public/pictures/icons/quizzesIconsd' + req.files.file.name,
            (err) => {
                if (err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.json({name: req.files.file.name});
            }
        );
    })

////////////////////////////////////////////
// Insérer une question
//Afficher toutes les questions du Quizz numéro X
    .get('/questions/:id',
        (req, res) => {
            db.all(
                "SELECT * FROM questions where quizzes_id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
    })
// Insérer une question 
    .post('/questions',
        (req, res) => {
            const q = req.body;
            db.run("INSERT INTO questions(sentence,video_url,score) values(?,?,?)",[q.sentence, q.video_url, q.score]);
            res.redirect(303, '/questions/');
        })
//Upload une vidéo
//Supprimer la question
//Modifier la question


////////////////////////////////////////////
// Insérer une réponse
//Affiche toutes les réponses de la question X du quizz X
    .get('/answers/:id',
        (req, res) => {
            db.all(
                "select * from answers WHERE questions_id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
    })
// Insérer une réponse 
    //Si c'est une image j'affiche : picture_url
    //Si c'est du texte j'affiche : sentence
    .post('/answers',
    (req, res) => {
        db.run("insert into answers(sentence, picture_url, solution) values(?,?,?)",[q.sentence, q.picture_url, q.solution]);
        res.redirect(303, '/answers');
    })
//Suppromer une réponse
//Modifier une réponse
//Mettre une image

////////////////////////////////////////////
//Afficher une personne
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
        db.run("INSERT INTO persons(id, name, mail, passwords, user_id) values(?,?,?,?,?)",[q.name, q.mail, q.keywords, q.passwords]);
        res.redirect(303, '/persons');
    })
//modifer une personne
    .patch('/persons/:id',
    (req, res) => {
        db.run("update persons set name=? where id=?",[req.body,req.params.id]);
        res.status(200).json(req.body);
    })
//supprimer une personne
    .delete('/persons/:id',
        (req, res) => {
            db.run('DELETE FROM persons WHERE id=?', [req.params.id]);
            res.redirect(204, "/persons");
    })

////////////////////////////////////////////
//Error 404
    .use((req, res) => {
    res.status(404);
    res.json({
        error: "Bad request"
    });
})
;

module.exports = router;
