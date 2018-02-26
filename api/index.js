const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/myecom');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.use('/api', router);

app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
