'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var postSchema = new Schema({
  postedBy: {
    type: String
  },
  ownerUsername: {
    type: String
  },
  profileImageUrl: {
    type: String
  },
  imageURL: {
    type: String,
    default: ""
  },
  pinnedBy: {
    type: Array,
    default: []
  }
}, { usePushEach: true });

module.exports = _mongoose2.default.model('postsModel', postSchema);

// db.postsmodels.insert({postedBy: "me",
//   imageURL:"https://i.pinimg.com/736x/88/f5/30/88f530223bc2f809cf28d54efcae127a--scandinavian-living-rooms-nordic-living.jpg",
//   profileImageUrl:'https://pbs.twimg.com/profile_images/898295311893880832/bCps4HFV_400x400.jpg',
//   ownerUsername:'me'})