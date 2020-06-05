//server.js

const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors')
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/app'));
}


app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'src/app', 'index.html'));
  console.log("dasdas");
  console.log(__dirname);
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

app.route('/api/pins/group:id').get((req, res) => {
  db.collection('Pin').find({gruppen_id: req.params['id']}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get pins.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/pins').post((req, res) => {
  var newPin= req.body;
  newPin.createDate = new Date();
  newPin._id = new ObjectID();

  if(!req.body.autor_id || !req.body.inhalt || !req.body.autor_id || !req.body.autor_name) {
    console.log("Invalid User input", "Must provide a full Pin", 400)
  }
  else {
    db.collection('Pin').insertOne(newPin, function(err, docs) {
      if (err) {
        console.log(err.message);
      } else {
        res.status(201).json(docs);
      }
    });
  }
});

app.route('/api/pins:id').delete((req, res) => {
  db.collection('Pin').deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete Pin");
    } else {
      console.log("deleted pin with id: " + req.params['id']);
      res.status(200).json(result);
    }
  });
});
app.route('/api/pins:id').put((req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection('Pin').replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
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

app.route('/api/users/name:name').get((req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  db.collection('Benutzer').find({name: req.params['name']}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contact.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/users/email:email').get((req, res) => {
  db.collection('Benutzer').find({email: req.params['email']}).toArray(function(err, docs) {
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
  newUser._id = new ObjectID();

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

app.route('/api/groups/user:id').get((req, res) => {
  db.collection('Gruppen').find({nutzer_ids: req.params.id }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get gruppen.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/groups').get((req, res) => {
  db.collection('Gruppen').find().toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get gruppen.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.route('/api/groups').post((req, res) => {
  var newGroup= req.body;
  newGroup.createDate = new Date();
  newGroup._id = new ObjectID();

  if(!req.body.name || !req.body.admin_id || !req.body.nutzer_ids) {
    console.log("Invalid Group input", "Must provide a full Group", 400)
  }
  else {
    db.collection('Gruppen').insertOne(newGroup, function(err, docs) {
      if (err) {
        console.log(err.message);
      } else {
        res.status(201).json(docs);
      }
    });
  }
});

app.route("/api/groups:id").put((req, res)=> {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection('Gruppen').replaceOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });

});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
