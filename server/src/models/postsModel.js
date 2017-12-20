import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var postSchema = new Schema({
  postedBy: {
    type: String
  },
  ownerUsername: {
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
})

module.exports = mongoose.model('postsModel', postSchema);
