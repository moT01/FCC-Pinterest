import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('userModel', userSchema);
