const express = require('express')
const app = express()
const cors = require('cors')
const { Client } = require('pg');
const bodyParser = require('body-parser')



var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.listen(8000, () => {
  console.log('Server started!')
})


const client = new Client({
  host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
  user: process.env.USER || 'fodxnyyjvemdgi',
  password: '13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b',
  database: 'dbouih7qphiunh',
  port: 5432,
  ssl:true // {  rejectUnauthorized: false }
});

client.connect();

app.route('/api/users').post((req, res) => {
  res.status(201).send(req.body)
})

app.route('/api/users/:name').put((req, res) => {
  console.log("Currently not supported")
  res.send(200, req.body)
})

app.route('/api/users/:name').delete((req, res) => {
  res.sendStatus(204)
})

app.route('/api/users').get((req, res) => {
  client.query('SELECT * FROM Benutzer', function (error, results, fields) {
    if (error) res.send(JSON.stringify({error: error}));
    else res.status(200).send(JSON.stringify({users: results.rows}));
  });
})

app.route('/api/users/:bid').get((req, res) => {
  const requestedUserBID = req.params['bid'];
  const query = {text: 'SELECT * FROM benutzer WHERE name = $1', values: requestedUserBID};
  client.query(query, [], function (error, results) {
    if (error) res.send(JSON.stringify({error: error}));
    // else res.status(200).send(JSON.stringify({users: results.rows}));
    else res.status(200).json(results);
  });
})
