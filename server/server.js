const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Twitter = require('node-twitter');
const config = require('./config.js');

// setup Twitter API library with personal keys
const twitterSearchClient = new Twitter.SearchClient(
  config.CONSUMER_KEY,
  config.CONSUMER_SECRET,
  config.TOKEN,
  config.TOKEN_SECRET
);

// setup body parser for client-side user input (post request) and cors
app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function crossOrigin(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});

// post request with a user input
app.post('/search/:key', (req, res, next) => {
  const key = req.params.key; 
  twitterSearchClient.search({'q': key}, function(error, result) {
    if (error) {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }
 
    if (result) {
      res.send(result);
    }
  });
});

// and app is listening on port..
app.listen(port, () => {
  console.log('Listening on port' + port);
});