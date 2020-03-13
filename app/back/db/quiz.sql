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
   ("Korean", "korean.jpg", "korean;write"),
   ("Japan", "japan.jpg", "japan;culture"),
   ("Sailor Moon Chrystal", "sailor.jpg", "sailor"),
   ("Studio Ghibli", "totoro.jpg", "japan;culture;anime;movies"),
   ("K-drama", "japan.jpg", "korean;culture;series;actors");

INSERT INTO questions (sentence, video_url, score, quizzes_id)
VALUES
   ("What is the name of the korean alphabet ?", null, 1, 1),
   ("Why was the alphabet invented ?", null, 2, 1),
   ("When was the Korean alphabet created ?", null, 1, 1),
   ("Who is the creator of the Korean alphabet ?", null, 3, 1),
   ("Which one of these characters is Korean?", null, 1, 1),
   ("What is that ?", "write.mp4", 3, 1),

   ("What is the name of the traditional Japanese portal ? ", null, 1, 2),
   ("In what building are the sutras and historical books stored ? ", null, 1, 2),
   ("How is the name of a temple composed ? Several choices ", null, 1, 2),
   ("What is the roof of the Zen-era Kyoto Golden Pavilion covered with ? ", null, 1, 2),
   (" What is the Itsukushima Shrine, largely lacquered in vermilion red, built on in Hiroshima ?", null, 1, 2),
   (" What's Japan's nickname ?", null, 1, 2),
   ("How many islands does Japan consist of ? ", null, 1, 2),
   ("What is the highest peak in Japan ? ", null, 1, 2),
   ("What's Japan's currency ? ", null, 1, 2),
("Who is the current Emperor of Japan ? ", null, 1, 2),
("Which company is not Japanese ? ", null, 1, 2),

   (" What is the number of existing sailors?", null, 1, 4),
   ("What is the color of Sailor Jupiter ? ", null, 1, 4),
   ("What is the power of Sailor Mars ? ", null, 1, 4),
   ("What's the name of the palace? ", null, 1, 4),
   ("Who's the first Sailor to get her memory back?", null, 1, 4),
   ("Whose Tuxedo Mask is the reincarnation?", null, 1, 4),
   ("What's the name of the Queen of the Moon?", null, 1, 4),
   ("What color's Luna?", null, 1, 4),
   ("What's the gray cat's name?", null, 1, 4),
   ("What is the power of Sailor Saturn?", null, 1, 4),
   ("What's Sailor Neptune's instrument?", null, 1, 4);


INSERT INTO answers (sentence, picture_url, solution, questions_id)
VALUES


  ("Hangoul ", NULL, 0, 1),
  ("Hangeul ", NULL, 1, 1),
   ("Hamgi ", NULL, 0, 1),
  ("Namji ", NULL, 0, 1),

 ("to enable people to learn to read and write ", NULL, 0, 2),
  ("for fun ", NULL, 0, 2),
   ("to become independent from other countries ", NULL, 0, 2),
  ("to compete with china ", NULL, 0, 2),

("1443 ", NULL, 0, 3),
  ("1762 ", NULL, 0, 3),
   ("356", NULL, 0, 3),
  ("200 before Christ ", NULL, 0, 3),

("Taejong ", NULL, 0, 4),
  ("Taejo ", NULL, 0, 4),
   ("Jeongjong", NULL, 0, 4),
  ("Sejong the Great ", NULL, 0, 4),

("爾 ", NULL, 0, 5),
  ("모든 ", NULL, 0, 5),
   ("ろ", NULL, 0, 5),
  ("D", NULL, 0, 5),

("Calligraphy ", NULL, 0, 6),
  ("Typewirting  ", NULL, 0, 6),

("Torii ", NULL, 0,7),
  ("Karamon ", NULL, 0, 7),
   ("Kamis", NULL, 0, 7),
  ("Benzaiten", NULL, 0, 7),

("Pagoda ", NULL, 0, 8),
  ("Kairo ", NULL, 0, 8),
   ("Kyōzō", NULL, 0, 8),
  ("Mon", NULL, 0, 8),

("The sangō ", NULL, 0, 9),
  ("The sōrin ", NULL, 0, 9),
   ("The ingō", NULL, 0, 9),
  ("The san'in-jigō", NULL, 0, 9),

(null, wood.jpg, 0, 10),
  (null, leaf.jpg, 0, 10),
   (null, gold.jpg, 0, 10),
  (null, metal.jpg, 0, 10),

("The country of the red dot ", NULL, 0, 11),
  ("The country of the rising sun ", NULL, 0, 11),
   ("The country of the anime", NULL, 0, 11),
  ("The country of the setting sun", NULL, 0, 11),

("7563 ", NULL, 0, 12),
  ("65 ", NULL, 0, 12),
   ("6852", NULL, 0, 12),
  ("483", NULL, 0, 12),

("Mount Poroshiri ", NULL, 0, 13),
  ("Mount Fuji ", NULL, 0, 13),
   ("Mount Nasu", NULL, 0, 13),
  ("Mount Nantai", NULL, 0, 13),

("The euro ", NULL, 0, 14),
  ("The yen ", NULL, 0, 14),
   ("The yuan", NULL, 0, 14),
  ("The books", NULL, 0, 14),

("Akihito ", NULL, 0, 15),
  ("Meiji ", NULL, 0, 15),
   ("Hiro Hito", NULL, 0, 15),
  ("Michiko Shoda", NULL, 0, 15),

   ("Toyota ", NULL, 1, 16),
   ("Mitsubishi", NULL, 0, 16),
   ("Sony", NULL, 0, 16),
   ("Samsung ", NULL, 0, 16),

  ("10 ", NULL, 1, 17),
   ("9", NULL, 0, 17),
   ("8", NULL, 0, 17),
   ("11 ", NULL, 0, 17),

   ("red ", NULL, 0, 18),
   ("pink ", NULL, 0, 18),
   ("blue ", NULL, 0, 18),
   ("green ", NULL, 1, 18),

   ("Chrystal Palace  ", NULL, 0, 19),
   ("Moon Palace ", NULL, 0, 19),
   ("Star Palace ", NULL, 1, 19),
   ("Planetrium ", NULL, 1, 19),

   ("Uranus ", NULL, 0, 20),
   ("Venus ", NULL, 0, 20),
   ("Mars ", NULL, 0, 20),
   ("Mercure ", NULL, 0, 20),

   ("MercFrom the prince of the kingdom of the earthure ", NULL, 0, 21),
   ("From the King of Stars ", NULL, 0, 21),
   ("From the Prince of the Moon ", NULL, 0, 21),
   ("Of no-one ", NULL, 0, 21),

   ("Queen Beryl ", NULL, 0, 22),
   ("Queen Serinity ", NULL, 0, 22),
   ("Queen Moony ", NULL, 0, 22),
   ("Queen Trinity ", NULL, 0, 22),


   ("White ", NULL, 0, 23),
   ("Black ", NULL, 0, 23),
   ("Blue ", NULL, 0, 23),
   ("Red ", NULL, 0, 23),


   ("Luna ", NULL, 0, 24),
   ("Artemis ", NULL, 0, 24),
   ("Diana ", NULL, 0, 24),
   ("Plutonus ", NULL, 0, 24),

   ("Fire ", NULL, 0, 25),
   ("Time ", NULL, 0, 25),
   ("Destruction ", NULL, 0, 25),
   ("Fly ", NULL, 0, 25),

   ("Piano ", NULL, 0, 26),
   ("Flute ", NULL, 0, 26),
   ("Harp ", NULL, 0, 26),
   ("Violin ", NULL, 0, 26);


INSERT INTO persons VALUES
   (1,'Jane','jane@toto.fr','1234'),
   (2,'John','john@toto.fr','1234'),
   (3,'Jack','jack@toto.fr','1234');

INSERT INTO personsQuizzes VALUES
    (1, 2, 1, 10),
    (2, 3, 1, 2),
    (3, 1, 1, 6);
