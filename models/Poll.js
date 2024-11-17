const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  pollId: Number,
  pollTitle: String,
  options: [String],
  votes: [Number],
});

module.exports = mongoose.model('Poll', PollSchema);