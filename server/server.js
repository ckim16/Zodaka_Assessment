const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const twtitter = require('node-twitter');

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log('Listening on port' + port);
});