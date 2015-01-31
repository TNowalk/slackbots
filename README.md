# slackbots

A collection of super simple slackbot endpoints that were created for the various slack teams that I'm a part of.

### Getting Started
Clone this repo by running this:

```
git clone https://github.com/TNowalk/slackbots.git
cd slackbots && npm install
```

To run the server, type:

```
node app.js
```

### A Note on Slack
Slack is a pretty awesome tool and they really offer a ton of options to integrate various functionality into it.  One of those is through "Slash Commands."  The endpoints here utilize the slash commands, it's good to have an idea of how the app interacs with Slack.  A slash command kicks off a GET or POST request to the defined URL.  Here's an example of the data that Slack sends the outgoing API:

```
/define bluebird
{
  token: 'n8mX3PqgaEc2Lltd0TNFAnW4',
  team_id: 'T0001',
  channel_id: 'C2147483705',
  channel_name: 'test',
  user_id: 'U2147483697',
  user_name: 'Steve',
  command: '/define',
  text: 'bluebird'
}
```

The response from the endpoint should simply respond with that text that is to be sent back to the user who executed the command.

To set up a new slash command, you must be an admin of your Slack group.  Head here => https://<your-slack-group>.slack.com/services/new and find the Slash Commands integration, click the Add button.  The command name can be whatever you like, the URL should point to your server and the appropriate endpoint and the Method should match the method defeind for the endpoint.  The rest of the configs should be self explanatory.

### Endpoints

#### Define

The `POST /define` endpoint allows you to retrieve the definition of the supplied word

Note: To use this API, you must signup for an API key at Wordnik here http://developer.wordnik.com/.  The API key should be set in an environment variable called `WORDNIK_API_KEY`.

##### Example
`curl -X POST --data "user_name=Steve&text=bluebird" http://localhost:3000/define`

##### Output
```
bluebird (noun): Any of several North American songbirds of the genus Sialia, having blue plumage and usually a rust-colored breast in the male.from The American Heritage® Dictionary of the English Language, 4th Edition (<http://www.wordnik.com/words/bluebird|Powered by Wordnik)>
```

#### Stocks

The `POST /stocks` endpoint allows you to retrieve the current price of the supplied symbol

Note: To use this API, you must signup for an auth token at Quandl here https://www.quandl.com/.  The toekn should be set in an environment variable called `QUANDL_AUTH_TOKEN`.

As of right now, this endpoint expects `text` to be a symbol to look up.  I may end up adding some sort of "AI" via some Natural Language Processing to detect things like `/stocks price change for aapl over 7 days`.  We'll see how complicated I want to get with it.

##### Example
`curl -X POST --data "user_name=Steve&text=aapl" http://localhost:3000/stock`

##### Output
```
*Apple Inc. (AAPL)*
AAPL - _Updated 5 hours ago_
Price: $117.16, Change: -1.74 (-1.46%)
```