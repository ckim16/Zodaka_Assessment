const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Twitter = require('node-twitter');

const twitterSearchClient = new Twitter.SearchClient(
  '2nRVfvrrKx2tBomPsKLck72Jh',
  '1gGjAmsGnqdmEdlIIUjOSmbxgvbPjQJx95Se0GlurwfD5Dl6wa',
  '750932700828143616-Z58bb49iJpp7VWE73rzGjIqBu2lgga5',
  'nf1Zz8eYREZZXvBruuuz6TYNsPrxHk6XwBGMRrRg5zLJS'
);

app.use(bodyParser.json({type: '*/*'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function crossOrigin(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  return next();
});

app.post('/search/:key', (req, res, next) => {
  const key = req.params.key; 
  twitterSearchClient.search({'q': key}, function(error, result) {
    if (error) {
      console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    }
 
    if (result) {
      console.log(result);
    }
  });
  next();
});

app.listen(port, () => {
  console.log('Listening on port' + port);
});