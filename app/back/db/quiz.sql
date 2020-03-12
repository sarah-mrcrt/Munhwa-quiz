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
   ("Sailor Moon Chrystal", "Aix/aix.jpg", "brian;people"),
   ("quizz1", "Aix/aix.jpg", "brian;people"),
   ("quizz2", "Aix/aix.jpsenteng", "toto;people");

INSERT INTO questions (sentence, video_url, score, quizzes_id)
VALUES
   ("where is brian?",NULL, 3, 3),
   ("where is brian?","piano.mov", 3, 3),
   ("who is brian?",NULL, 1, 3),
   ("where is toto?","piano.mov", 3, 2),
   ("who is toto?",NULL, 1, 2);

   ("What is the name of Deadly Sins leader ?",NULL, 1, 1),
   ("What is the name of the second daughter of King Baltras ?",NULL, 1, 1),
   ("What's King's nature ?",NULL, 2, 1),
   ("What is the magic technique of meliodas?",NULL, 2, 1),
   ("What sin does Merlin represent?",NULL, 1, 1),
   ("When is Excanor vulnerable?",NULL, 2, 1),
   ("What is Gowther desperately looking for?",NULL, 2, 1),
   ("What's Gowther's tattoo?",NULL, 1, 1),
   ("Who is Ban in love with",NULL, 2, 1),
   ("Why doesn't Meliodas have full power?",NULL, 3, 1),
   ("From what people does Meliodas come?",NULL, 2, 1);

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

INSERT INTO persons VALUES
   (1,'Jane','jane@toto.fr','1234'),
   (2,'John','john@toto.fr','1234'),
   (3,'Jack','jack@toto.fr','1234');

INSERT INTO personsQuizzes VALUES
    (1, 2, 1, 10),
    (2, 3, 1, 2),
    (3, 1, 1, 6);
