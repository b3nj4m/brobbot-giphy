var giphy = require('giphy-api');
var Q = require('q');

var API_KEY = process.env.BROBBOT_GIPHY_API_KEY;

var api = giphy(API_KEY);

function search (text) {
  return Q.ninvoke(api, 'search', text);
}

module.exports = function (robot) {
  robot.helpCommand('giphy `search`', 'search giphy for an animation tagged with `search`');

  robot.respond(/^giphy (.*)/, function (msg) {
    return search(msg.match[1]).then(function (response) {
      msg.send(response);
    });
  });
};
