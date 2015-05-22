var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var md = require('marked');

var defineBot = require('./define');
var stocksBot = require('./stocks');
var gotoBot = require('./goto');
var youtube = require('./youtube');
// var poll = require('./poll');
var jira = require('./jira');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) {
  console.log('this is a test');
  fs.readFile('./README.md', 'utf8', function(err, data) {
    var html = '<!doctype html>' +
               '<html>' +
               '<head>' +
                 '<meta charset="utf-8"/>' +
                 '<titleSlackbots</title>' +
                  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">' +
                  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">' +
               '</head>' +
               '<body>' +
                 '<div class="container">' +
                   md(data) +
                 '</div>' +
               '</body>' +
               '</html>';
    res.status(200).send(html);
  });
});

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
app.post('/youtube', youtube);
// app.post('/poll', poll);
app.post('/jira', jira);