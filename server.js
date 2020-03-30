//server.js
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('./dist/Pinnwand2'));
app.get('/*', function(req, res) {
  res.sendFile(path.join('./dist/Pinnwand2/index.html'));
});
app.listen(process.env.PORT || 8080);
