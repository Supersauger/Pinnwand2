//server.js
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname+'/dist/Pinnwand2'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname+'/dist/Pinnwand2/index.html'));
});
app.listen(process.env.PORT || 8080);

var router = express.Router()

const { Client } = require('pg');

const client = new Client({
  host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
  user: process.env.USER || 'fodxnyyjvemdgi',
  password: '13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b',
  database: 'dbouih7qphiunh',
  port: 5432,
  ssl:true // {  rejectUnauthorized: false }
});

client.connect();

client.query('SELECT * FROM Benutzer', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
