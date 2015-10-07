var giphy = require('giphy-api');
var Q = require('q');

var API_KEY = process.env.BROBBOT_GIPHY_API_KEY;
var USE_MP4 = process.env.BROBBOT_GIPHY_USE_MP4 !== 'false';

var api = giphy(API_KEY);

function search (text, rating) {
  return Q.ninvoke(api, 'search', {q: text, rating: rating || 'pg-13', fmt: 'json'});
}

function randomItem (list) {
  return list[Math.round(Math.random() * list.length - 1)];
}

function mp4 (data) {
  return data.images.fixed_height.mp4;
}

function gif (data) {
  return data.images.fixed_height.gif;
}

module.exports = function (robot) {
  robot.helpCommand('giphy `search`', 'search giphy for an animation tagged with `search`');
  robot.helpCommand('giphy-unsafe `search`', 'search giphy for an animation with any rating, tagged with `search`');

  var url = USE_MP4 ? mp4 : gif;

  robot.respond(/^giphy (.*)/, function (msg) {
    return search(msg.match[1]).then(function (response) {
      return msg.send(url(randomItem(response.data)));
    });
  });

  robot.respond(/^giphy-unsafe (.*)/, function (msg) {
    return search(msg.match[1], 'r').then(function (response) {
      return msg.send(url(randomItem(response.data)));
    });
  });
};
