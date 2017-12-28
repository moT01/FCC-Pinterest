'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _authRoutes = require('./routes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _postsRoutes = require('./routes/postsRoutes');

var _postsRoutes2 = _interopRequireDefault(_postsRoutes);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _passportTwitter = require('./auth/passportTwitter');

var _passportTwitter2 = _interopRequireDefault(_passportTwitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

(0, _passportTwitter2.default)();

var port = process.env.PORT || 8080;

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/pinterest1', { useMongoClient: true });

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, '../build')));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use((0, _cors2.default)(corsOption));

app.use('/api/auth', _authRoutes2.default);
app.use('/api/posts', _postsRoutes2.default);

app.listen(port, function () {
  return console.log('Running on port: ' + port);
});