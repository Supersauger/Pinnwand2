//server.js

const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')
const mongodb = require('mongodb');
const bodyParser = require('body-parser')


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

const uri = "mongodb://heroku_l3zg1n03:sr7okf4p5h1g1e8fkmn8j3v5h1@ds239157.mlab.com:39157/heroku_l3zg1n03?retryWrites=false";


//app.listen(process.env.PORT || 8080);

var router = express.Router()



var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(bodyParser.json())
app.use(cors(corsOptions))

mongodb.MongoClient.connect(process.env.MONGODB_URI || uri, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
/*
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname+'/src/index.html'));
});*/
/*
app.listen(8080, () => {
  console.log('Server started!')
})
/*
const client = new Client({
  host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
  user: process.env.USER || 'fodxnyyjvemdgi',
  password: '13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b',
  database: 'dbouih7qphiunh',
  port: 5432,
  ssl:true // {  rejectUnauthorized: false }
});*/

/*
app.route('/api/users').post((req, res) => {
  client.query('INSERT INTO Benutzer(name, email, passwort) values ($1,$2,$3)',[req.body.name,req.body.email, req.body.passwort], function (error, results) {
    if (error) res.send(JSON.stringify({error: error}));
    else res.status(200).send(JSON.stringify({users: results.rows}));
  });
  res.status(201).send(req.body)
})

app.route('/api/users/:name').put((req, res) => {
  console.log("Currently not supported")
  res.send(200, req.body)
})

app.route('/api/users/:name').delete((req, res) => {
  res.sendStatus(204)
})
/*
app.route('/api/users').get((req, res) => {
  client.query('SELECT * FROM Benutzer', function (error, results, fields) {
    if (error) res.send(JSON.stringify({error: error}));
    else res.status(200).send(JSON.stringify({users: results.rows}));
  });
})*/


app.route('/api/users').get((req, res) => {
  db.collection('Benutzer').find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/users').post((req, res) => {
  var newUser= req.body;
  newUser.createDate = new Date();

  if(!req.body.name || !req.body.email || !req.body.passwort) {
    console.log("Invalid User input", "Must provide Name, email and Password", 400)
  }
  else {
    db.collection('Benutzer').insertOne(newUser, function(err, docs) {
      if (err) {
        console.log(err.message);
      } else {
        res.status(201).json(docs);
      }
    });
  }
});
/*
app.route('/api/users/:bid').get((req, res) => {
  const requestedUserBID = req.params['bid'];
  const query = {text: 'SELECT * FROM benutzer WHERE bid = $1', values: requestedUserBID};
  client.query(query, [], function (error, results) {
    if (error) res.send(JSON.stringify({error: error}));
    // else res.status(200).send(JSON.stringify({users: results.rows}));
    else res.status(200).json(results);
  });
})*/
