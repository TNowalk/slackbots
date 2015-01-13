var request = require('request');

module.exports = function (req, res, next) {
  var apiKey = process.env.WORDNIK_API_KEY;
  var url = 'http://api.wordnik.com/v4/word.json/';
  var endpoint = '/definitions/';

  var text = req.body.text;
  var userName = req.body.user_name;

  text = text.replace(' ', '%20');

  var path = url + text + endpoint + '?api_key=' + apiKey;

  request({url: path, json: true}, function (error, response, body) {
    var botPayload = {
      text : '',
    };

    if (!error && response.statusCode == 200) {
      if (body.length > 0) {
        var definition = body[0];
        botPayload.text = text + ' (' + definition.partOfSpeech + '): ' +
          definition.text + definition.attributionText +
          ' (<http://www.wordnik.com/words/' + text + '|Powered by Wordnik)>';
      } else {
        botPayload.text = 'Could not find definition for ' + text;
      }
    } else {
      botPayload.text = 'Error occured while defining ' + text;
    }

    if (userName !== 'slackbot') {
      return res.status(200).send(botPayload.text);
    } else {
      return res.status(200).end();
    }
  });
};