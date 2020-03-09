const express = require('express');
const router = require('./router');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined')); //to get informations from the requete
app.use(cors()); //to allow requests from another application
app.use(bodyParser.json()); //Requests processing will be defined in the file router
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});


// console.log("This is the back !! Let's have fun with express.js");
// app.use('/public/picutes',express.static('data/img'));


app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});
