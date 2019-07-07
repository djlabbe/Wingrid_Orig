const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  sheet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sheet'
  },
  winners: {
    type: [String]
  },
  tiebreaker: {
    type: Number,
    required: true
  }
});

module.exports = Entry = mongoose.model('entry', EntrySchema);
