const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: String,
  voterId: String,
  userId: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);