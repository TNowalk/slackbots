var request = require('request');

var docs = {
  "ahk": "http://www.ahkscript.org/docs/commands/{query}.htm",
  "rails": "http://api.rubyonrails.org/?q={query}",
  "controller": "http://api.rubyonrails.org/?q={query}",
  "ruby": "http://ruby-doc.com/search.html?q={query}",
  "js": "https://developer.mozilla.org/en-US/search?q={query}&topic=js",
  "html": "https://developer.mozilla.org/en-US/search?q={query}&topic=html",
  "coffee": "https://developer.mozilla.org/en-US/search?q={query}",
  "php": "http://php.net/manual-lookup.php?pattern={query}",
  "clojure": "http://clojuredocs.org/search?x=0&y=0&q={query}",
  "go": "http://golang.org/search?q={query}",
  "c": "http://www.cplusplus.com/search.do?q={query}",
  "cpp": "http://www.cplusplus.com/search.do?q={query}",
  "smarty": "http://www.smarty.net/{query}",
  "cmake": "http://cmake.org/cmake/help/v2.8.8/cmake.html#command:{query}",
  "perl": "http://perldoc.perl.org/search.html?q={query}",
  "cs": "http://social.msdn.microsoft.com/Search/?query={query}",
  "lua": "http://pgl.yoyo.org/luai/i/{query}",
  "pgsql": "http://www.postgresql.org/search/?u=%%2Fdocs%%2Fcurrent%%2F&q={query}",
  "erlang": "http://erldocs.com/R16B03/?search={query}",
  "haskell": "http://hayoo.fh-wedel.de/?query={query}",
  "scala": "http://scalex.org/?q={query}",
  "css": "http://devdocs.io/#q=css+{query}",
  "scss": "http://devdocs.io/#q=scss+{query}",
  "less": "http://devdocs.io/#q=less+{query}",
  "google": "https://google.com/search?q={query}",
  "python": "http://docs.python.org/3/search.html?q={query}",
  "lmgtfy": "http://lmgtfy.com/?q={query}",
  "jquery": "http://api.jquery.com/{query}/"
};

module.exports = function (req, res, next) {

  var origText = req.body.text;
  var userName = req.body.user_name;

  var input = origText.split(' ');

  if (input.length < 2) {
    return res.status(200).send('A language and query is required');
  }

  var lang = input.shift();
  var query = '';

  if (input.length) {
    query = input.join('%20');
  }

  if (docs[lang] === undefined) {
    return res.status(200).send('Unknown language (' + lang + ')');
  }

  var url = docs[lang].replace('{query}', query);

  if (userName !== 'slackbot') {
    return res.status(200).send('<' + url + '>');
  } else {
    return res.status(200).end();
  }

  /*
  request({url: path, json: true}, function (error, response, body) {
    var botPayload = {
      text : '',
    };

    if (!error && response.statusCode == 200) {
      if (body.length > 0) {
        var definition = body[0];
        botPayload.text = origText + ' (' + definition.partOfSpeech + '): ' +
          definition.text + definition.attributionText +
          ' (<http://www.wordnik.com/words/' + text + '|Powered by Wordnik)>';
      } else {
        botPayload.text = 'Could not find definition for ' + origText;
      }
    } else {
      botPayload.text = 'Error occured while defining ' + origText;
    }
  });
*/
};