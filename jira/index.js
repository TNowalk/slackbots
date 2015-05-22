var request = require('request');

module.exports = function (req, res, next) {
  var baseUrl = process.env.JIRA_BASE_URL;

  if (!baseUrl) {
    return res.status(200).send({text: 'Invalid Jira base URL'});
  }

  var origText = req.body.text;
  var userName = req.body.user_name;

  var ticket = origText;

  if (!ticket) {
    return res.status(200).send({text: 'Invalid ticket'});
  }

  var botPayload = {
    text: '<' + baseUrl + '/' + ticket + '>'
  };

  res.status(200).send(botPayload.text);
};