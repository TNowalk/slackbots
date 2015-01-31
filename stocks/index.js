var request = require('request');
var moment = require('moment');

module.exports = function (req, res, next) {
  var token = process.env.QUANDL_AUTH_TOKEN;

  if (!token) {
    return res.status(200).send({text: 'Invalid auth token'});
  }

  var url = 'https://www.quandl.com/api/v1/datasets/WIKI/';

  var origText = req.body.text;
  var userName = req.body.user_name;

  var symbol = origText.replace(' ', '');

  if (!symbol) {
    return res.status(200).send({text: 'Invalid symbol'});
  }

  symbol = symbol.toUpperCase();

  var path = url + symbol + '.json?auth_token=' + token + '&rows=2';

  request({url: path, json: true}, function (error, response, body) {
    var botPayload = {
      text : '',
    };

    if (!error && response.statusCode == 200) {
      if (!Object.keys(body.errors).length) {
        var ticker = body.code;
        var name = body.name;
        var data = [];

        for (var i = 0; i < body.data.length; i++) {
          data.push({
            date: body.data[i][0],
            open: body.data[i][1],
            high: body.data[i][2],
            low: body.data[i][3],
            close: body.data[i][4]
          });
        }

        var price  = Math.round(data[0].close * 100);
        var last   = Math.round(data[1].close * 100);
        var change = price - last;
        var changePercent = last ? change / last * 100 : 0;
        var time = body.updated_at;

        var m = moment(time);
        var fromNow = m.fromNow();

        price /= 100;
        change /= 100;
        changePercent = Math.round(changePercent * 100) / 100;

        botPayload.text = "*" + name + "*\n" +
          ticker + ' - _Updated ' + fromNow + "_\n" +
          'Price: $' + price + ', Change: ' + change + ' (' + changePercent + '%)';
      } else {
        botPayload.text = 'Could not lookup symbol (' + origText + ')';
      }
    } else {
      botPayload.text = 'Error occured while looking up symbol (' + origText + ')';
    }

    if (userName !== 'slackbot') {
      return res.status(200).send(botPayload.text);
    } else {
      return res.status(200).end();
    }
  });
};