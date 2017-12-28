'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _postsModel = require('../models/postsModel');

var _postsModel2 = _interopRequireDefault(_postsModel);

var _isImageUrl = require('is-image-url');

var _isImageUrl2 = _interopRequireDefault(_isImageUrl);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetch = require('node-fetch');
var router = _express2.default.Router();

router.get('/allPosts', function (req, res) {
  console.log('/allPosts');

  _postsModel2.default.find().then(function (allPosts) {
    res.send(allPosts);
  }).catch(function (err) {
    res.send([err]);
  });
});

router.patch('/getUserPosts', function (req, res) {
  console.log('/getUserPosts');

  var id = req.body.id;

  console.log(id);
  _postsModel2.default.find({ 'postedBy': id }).then(function (userPosts) {
    console.log("posts: " + userPosts);
    res.send(userPosts);
  }).catch(function (err) {
    console.log(err);
    res.send([err]);
  });
});

router.patch('/getPins', function (req, res) {
  console.log('/getPins');
  var userID = req.body.userID;


  _postsModel2.default.find().then(function (allPosts) {
    var myPins = allPosts.filter(function (post) {
      return post.pinnedBy.indexOf(userID) >= 0;
    });
    res.send({ myPins: myPins });
  }).catch(function (err) {
    res.send([err]);
  });
});

router.post('/createPost', function (req, res) {
  var createPost = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee() {
      var newPost;
      return _regeneratorRuntime2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newPost = new _postsModel2.default({
                postedBy: userID,
                ownerUsername: username,
                profileImageUrl: profileImageUrl,
                imageURL: imageURL
              });


              newPost.save().then(function (post) {
                console.log(post);
                message.type = 'success';
                message.content = 'holly molly';
                res.send({ message: message, post: post });
              }).catch(function (e) {
                res.send([message]);
              });

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function createPost() {
      return _ref.apply(this, arguments);
    };
  }();

  var _req$body = req.body,
      imageURL = _req$body.imageURL,
      userID = _req$body.userID,
      username = _req$body.username,
      profileImageUrl = _req$body.profileImageUrl;

  var message = { 'type': 'error', 'content': 'Could not add image' };

  if ((0, _isImageUrl2.default)(imageURL)) {
    createPost();
  } else {
    res.send([message]);
  }
});

router.patch('/deletePost', function (req, res) {
  var deletePost = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee2() {
      return _regeneratorRuntime2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:

              if (postOwnerID === authenticatedUserID) {

                _postsModel2.default.findOne({ "_id": postID }, function (err, post) {
                  if (err) {
                    res.send(err);
                  }

                  //if someone pinned it - remove the owner from the post
                  if (post.pinnedBy.length > 0) {
                    post.postedBy = null;
                    post.save().then(function () {
                      res.send([post]);
                    }).catch(function (e) {
                      res.send([e]);
                    });

                    //if nobody pinned - remove the whole post
                  } else {
                    _postsModel2.default.remove({ _id: postID }).then(function () {
                      res.send([postID]);
                    }).catch(function (err) {
                      res.send([err]);
                    });
                  }
                });
              }

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function deletePost() {
      return _ref2.apply(this, arguments);
    };
  }();

  console.log('/delete');
  var _req$body2 = req.body,
      postID = _req$body2.postID,
      postOwnerID = _req$body2.postOwnerID,
      authenticatedUserID = _req$body2.authenticatedUserID;

  console.log(postID);

  deletePost();
});

router.patch('/pinPost', function (req, res) {
  var pinPost = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee3() {
      return _regeneratorRuntime2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _postsModel2.default.findOne({ "_id": postID }, function (err, post) {
                if (err) {
                  res.send(err);
                }

                post.pinnedBy.push(userID);
                post.save().then(function () {
                  res.send({ post: post });
                }).catch(function (e) {
                  res.send(e);
                });
              });

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function pinPost() {
      return _ref3.apply(this, arguments);
    };
  }();

  console.log('/pinPost');
  var _req$body3 = req.body,
      postID = _req$body3.postID,
      userID = _req$body3.userID;

  console.log(postID);
  console.log(userID);

  pinPost();
});

router.patch('/unpinPost', function (req, res) {
  var unpinPost = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime2.default.mark(function _callee4() {
      return _regeneratorRuntime2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _postsModel2.default.findOne({ "_id": postID }, function (err, post) {
                if (err) {
                  res.send(err);
                }

                post.pinnedBy = post.pinnedBy.filter(function (id) {
                  return id !== userID;
                });

                //if we need to remove the post
                if (post.postedBy === null && post.pinnedBy.length === 0) {
                  _postsModel2.default.remove({ _id: postID }).then(function () {
                    res.send([postID]);
                  }).catch(function (err) {
                    res.send([err]);
                  });

                  //if we just need to send back an updated post
                } else {
                  post.save().then(function () {
                    res.send([post]);
                  }).catch(function (e) {
                    res.send(e);
                  });
                }
              });

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function unpinPost() {
      return _ref4.apply(this, arguments);
    };
  }();

  console.log('/unpinPost');
  var _req$body4 = req.body,
      postID = _req$body4.postID,
      userID = _req$body4.userID;

  console.log(postID);
  console.log(userID);

  unpinPost();
});

exports.default = router;