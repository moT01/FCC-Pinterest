'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require('passport-twitter');

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _passportTwitterToken = require('passport-twitter-token');

var _passportTwitterToken2 = _interopRequireDefault(_passportTwitterToken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//strategy config
module.exports = function () {
  _passport2.default.use(new _passportTwitterToken2.default({
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    includeEmail: true
  }, function (token, tokenSecret, profile, done) {
    _userModel2.default.upsertTwitterUser(token, tokenSecret, profile, function (err, user) {
      return done(err, user);
    });
  }));
};

//passport strategy that uses jwt