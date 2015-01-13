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

### Endpoints

#### Define

The `/define` endpoint allows you to retrieve the definition of the supplied word

Note: To use this API, you must signup for an API key at Wordnik here http://developer.wordnik.com/

##### Example
curl -X POST --data "user_name=Steve&text=bluebird" http://localhost:3000/define

##### Output:
```
{
    "text":"bluebird (noun): Any of several North American songbirds of the genus Sialia, having blue plumage and usually a rust-colored breast in the male.from The American Heritage® Dictionary of the English Language, 4th Edition (<http://www.wordnik.com/words/bluebird|Powered by Wordnik)>"
}
```