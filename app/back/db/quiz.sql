DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS persons;
DROP TABLE IF EXISTS personsQuizzes;

PRAGMA foreign_keys = ON;

CREATE TABLE quizzes (
   id INTEGER NOT NULL PRIMARY KEY,
   name TEXT,
   picture_url TEXT,
   keywords TEXT,
   user_id INTEGER
);

CREATE TABLE questions (
   id INTEGER NOT NULL PRIMARY KEY,
   sentence TEXT NOT NULL,
   video_url TEXT,
   score INTEGER,
   quizzes_id INTEGER REFERENCES quizzes(id)
);

CREATE TABLE answers (
   id INTEGER NOT NULL PRIMARY KEY,
   sentence TEXT,
   picture_url TEXT check((sentence IS NULL AND picture_url IS NOT NULL) OR (sentence IS NOT NULL AND picture_url IS NULL)),
   solution INTEGER check(solution in (0,1)),
   questions_id INTEGER REFERENCES questions(id)
);

CREATE TABLE persons (
   id INTEGER NOT NULL PRIMARY KEY,
   name TEXT,
   mail TEXT,
   passwords TEXT
);

CREATE TABLE personsQuizzes (
    id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER references persons(id),
    quizzes_id INTEGER references quizzes(id),
    score INTEGER
);

INSERT INTO quizzes (name,picture_url,keywords)
VALUES
   ("quizz1", "Aix/aix.jpg", "brian;people"),
   ("quizz2", "Aix/aix.jpg", "toto;people",
   ("quizz3", "7DS/deadlysins.jpg", "anime;seven;deadlysins;deadly");

INSERT INTO questions (sentence, score, quizzes_id)
VALUES
   ("where is brian?", 3, 1),
   ("where is brian?", 3, 1),
   ("who is brian?", 1, 1),
   ("where is toto?", 3, 2),
   ("who is toto?", 1, 2);
    ("where is brian?", 3, 1),
   ("where is brian?", 3, 1),
   ("who is brian?", 1, 1),
   ("where is toto?", 3, 2),
   ("who is toto?", 1, 2),
   ("What is the name of Deadly Sins leader ?", 1, 3),
   ("What is the name of the second daughter of King Baltras ?", 1, 3),
   ("What's King's nature ?", 2, 3),
   ("What is the magic technique of meliodas?", 2, 3),
   ("What sin does Merlin represent?", 1, 3),
   ("When is Excanor vulnerable?", 2, 3),
   ("What is Gowther desperately looking for?", 2, 3),
   ("What's Gowther's tattoo?", 1, 3),
   ("Who is Ban in love with", 2, 3),
   ("Why doesn't Meliodas have full power?", 3, 3),
   ("From what people does Meliodas come?", 2, 3);

INSERT INTO answers (sentence, picture_url, solution, questions_id)
VALUES
   ("in the living room", NULL, 0, 1),
   ("in the kitchen", NULL, 1, 1),
   ("in the garden", NULL, 1, 1),
   ("in the bathroom", NULL, 0, 1),
   (NULL, "Aix/euroNight1.jpg", 0, 2),
   (NULL, "Aix/festival1.jpg", 1, 2),
   (NULL, "Aix/granet1.jpg", 1, 2),
   ("a boy", NULL, 1, 3),
   ("a girl", NULL, 0, 3),
   ("in the living room", NULL, 0, 4),
   ("in the kitchen", NULL, 1, 4),
   ("in the garden", NULL, 0, 4),
   ("in the bathroom", NULL, 0, 4),
   ("a boy", NULL, 1, 5),
   ("a girl", NULL, 0, 5);
   ("Diane", NULL, 0, 6), 
   ("Ban", NULL, 0, 6), 
   ("Meliodas", NULL, 1, 6), 
   ("King", NULL, 0, 6), 
   ("Margareth", NULL, 0, 7), 
   ("Veronica", NULL, 1, 7),
   ("Elisabeth", NULL, 0, 7),
   ("Gerico", NULL, 0, 7),   
   ("Humain", NULL, 0, 😎,
   ("Ange", NULL, 0, 😎, 
   ("Elfe", NULL, 0, 😎, 
   ("Fée", NULL, 2, 😎, 
   ("Heavy Metal", NULL, 0, 9), 
   ("Désastre", NULL, 0, 9), 
   ("Contre-Total", NULL, 2, 9), 
   ("Infini", NULL, 0, 9), 
   ("Paresse", NULL, 0, 10), 
   ("Gourmandise", NULL, 1, 10),
   ("Envie", NULL, 0, 10), 
   ("Avarice", NULL, 0, 10),
   ("A l'aurore", NULL, 0, 11),
   ("Au crépuscule", NULL, 2, 11),
   ("La nuit", NULL, 1, 11),
   ("Le jour", NULL, 1, 11),
   ("Un livre", NULL, 0, 12),
   ("Méliodas", NULL, 0, 12),
   ("Les sentiments", NULL, 3, 12),
   ("La mémoire", NULL, 0, 12),
   ("Un serpent", "7DS/serpent.jpg", 0, 13),
   ("Un bélier", "7DS/belier.jpg", 1, 13),
   ("Un renard", "7DS/renard.jpg", 0, 13),
   ("Un dragon", "7DS/dragon.jpg", 0, 13),
   ("De la princesse Elisabeth", NULL, 0, 14),
   ("De la sainte Eileen", NULL, 2, 14), 
   ("De la magicienne Merlin", NULL, 0, 14),
   ("De la chevaliere Gerico", NULL, 0, 14),
   ("Il se les ai fait voler", NULL, 0, 15),
   ("Il y a renoncer", NULL, 0, 15),
   ("Il ne controle pas ses émotions", NULL, 4, 15),
   ("Il ne controrle pas sa puissance", NULL, 0, 15),
   ("Humains", NULL, 0, 16),
   ("Dieux", NULL, 0, 16),
   ("Démons", NULL, 2, 16),
   ("Demi-Dieux", NULL, 0, 16);


INSERT INTO persons VALUES
   (1,'Jane','jane@toto.fr','1234'),
   (2,'John','john@toto.fr','1234'),
   (3,'Jack','jack@toto.fr','1234');

INSERT INTO personsQuizzes VALUES
    (1, 2, 1,10),
    (2, 3, 1,2),
    (3, 1, 1,6);
