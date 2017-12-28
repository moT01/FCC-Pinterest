'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var router = _express2.default.Router();

var createToken = function createToken(auth) {
  console.log('auth');
  console.log(auth);
  return _jsonwebtoken2.default.sign({
    id: auth.id,
    username: auth.username,
    profile_image_url: auth.profile_image_url
  }, process.env.JWT_SECRET, {
    expiresIn: 60 * 120
  });
};

var generateToken = function generateToken(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

var sendToken = function sendToken(req, res) {
  res.setHeader('x-auth-token', req.token);
  return res.status(200).send(JSON.stringify(req.user));
};

//authenticating user on each call to the api
var authenticate = (0, _expressJwt2.default)({
  secret: process.env.JWT_SECRET,
  requestProperty: 'auth',
  getToken: function getToken(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
});

/*this end point handles sending request token from client to twitter and sending it back to client*/

router.route('/twitter/reverse').post(function (req, res) {
  console.log("req1:" + req);
  _request2.default.post({
    url: 'https://api.twitter.com/oauth/request_token',
    oauth: {
      oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET
    }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, { message: e.message });
    }

    var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    console.log("res1:" + JSON.parse(jsonStr));
    res.send(JSON.parse(jsonStr));
  });
});

/*this end point handels sending verification code from client to twitter and getting access token
 from twitter and making jwt and sending it back to client*/

router.route('/twitter').post(function (req, res, next) {
  console.log("req2:" + req);
  _request2.default.post({
    url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
    oauth: {
      consumer_key: 'KEY',
      consumer_secret: 'SECRET',
      token: req.query.oauth_token
    },
    form: { oauth_verifier: req.query.oauth_verifier }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, { message: err.message });
    }

    console.log("res2body" + body);
    var bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    var parsedBody = JSON.parse(bodyString);

    req.body['oauth_token'] = parsedBody.oauth_token;
    req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
    req.body['user_id'] = parsedBody.user_id;

    next();
  });
}, _passport2.default.authenticate('twitter-token', { session: false }), function (req, res, next) {
  if (!req.user) {
    return res.send(401, 'User Not Authenticated');
  }
  console.log('hi');
  console.log(req.user);
  // prepare token for API
  req.auth = {
    id: req.user.id,
    username: req.user.username,
    profile_image_url: req.user.profile_image_url
  };

  return next();
}, generateToken, sendToken);

exports.default = router;