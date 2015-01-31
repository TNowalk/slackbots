var express = require('express');
var bodyParser = require('body-parser');
var defineBot = require('./define');
var stocksBot = require('./stocks');
var gotoBot = require('./goto');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Hello world!'); });

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});

app.post('/define', defineBot);
app.post('/stock', stocksBot);
app.post('/goto', gotoBot);