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


app.route('/api/pins/user:id').get((req, res) => {
  db.collection('Pin').find({autor_id: req.params['id']}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get pins.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/users').get((req, res) => {
  db.collection('Benutzer').find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/users:name').get((req, res) => {
  console.log(req.body)
  console.log(req.body.name)
  db.collection('Benutzer').find({name: req.params['name']}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contact.");
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
