var giphy = require('giphy-api');
var Q = require('q');

var API_KEY = process.env.BROBBOT_GIPHY_API_KEY;
var FORMAT = process.env.BROBBOT_GIPHY_FORMAT || 'gif';
var RATING = process.env.BROBBOT_GIPHY_RATING || 'pg-13';

var api = giphy(API_KEY);

function search (text, rating) {
  return Q.ninvoke(api, 'search', {q: text, rating: rating, fmt: 'json'});
}

function searchRandomItem (text, rating, format, msg) {
  return search(text, rating).then(function (response) {
    return msg.send(format(randomItem(response.data)));
  }).fail(function (e) {
    console.error(e);
    msg.send('No gif results');
  });
}

function randomItem (list) {
  return list[Math.round(Math.random() * list.length - 1)];
}

function mp4 (data) {
  return data.images.fixed_height.mp4;
}

function gif (data) {
  return data.images.fixed_height.url;
}

function webp (data) {
  return data.images.fixed_height.webp;
}

var formats = new Map([
  ['mp4', mp4],
  ['gif', gif],
  ['webp', webp]
]);

module.exports = function (robot) {
  robot.helpCommand('brobbot giphy `search`', 'search giphy for an animation tagged with `search`');
  robot.helpCommand('brobbot giphy-unsafe `search`', 'search giphy for an animation with any rating, tagged with `search`');

  var format = formats.has(FORMAT) ? formats.get(FORMAT) : formats.get('gif');

  robot.respond(/^giphy (.*)/, function (msg) {
    return searchRandomItem(msg.match[1], RATING, format, msg);
  });

  robot.respond(/^giphy-unsafe (.*)/, function (msg) {
    return searchRandomItem(msg.match[1], 'r', format, msg);
  });
};
