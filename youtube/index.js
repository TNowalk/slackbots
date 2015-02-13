var request = require('request');
var YouTube = require('youtube-node');

module.exports = function (req, res, next) {
  var apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.status(200).send({text: 'Invalid Youtube API key'});
  }

  var youTube = new YouTube();
  youTube.setKey(apiKey);

  var origText = req.body.text;
  var userName = req.body.user_name;

  var query = origText;

  if (!query) {
    return res.status(200).send({text: 'Invalid query'});
  }

  youTube.search(query, 25, function(data) {
    var botPayload = {
      text : '',
    };

    var totalFound = data.items.length;

    if (totalFound > 0) {
      var randomIdx = Math.floor(Math.random() * data.items.length);
      var video = data.items[randomIdx];

      botPayload.text = '<https://www.youtube.com/watch?v=' + video.id.videoId + '>';
    } else {
      botPayload.text = 'Could not find any results for _' + query + '_';
    }


    if (userName !== 'slackbot') {
      return res.status(200).send(botPayload.text);
    } else {
      return res.status(200).end();
    }
  });
};