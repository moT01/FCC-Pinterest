import mongoose from 'mongoose';

var Schema = mongoose.Schema;

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
  imageURL:{
    type: String,
    default: "",
  },
  pinnedBy:{
    type:Array,
    default:[]
  }
}, { usePushEach: true });

module.exports = mongoose.model('postsModel', postSchema);

// db.postsmodels.insert({postedBy: "me",
//   imageURL:"https://i.pinimg.com/736x/88/f5/30/88f530223bc2f809cf28d54efcae127a--scandinavian-living-rooms-nordic-living.jpg",
//   profileImageUrl:'https://pbs.twimg.com/profile_images/898295311893880832/bCps4HFV_400x400.jpg',
//   ownerUsername:'me'})
