const mongoose = require('mongoose');

const NUM_GAMES = 15;

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  winners: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'team'
      }
    ],
    validate: [arrayLen, '{PATH} must contain exactly 15 games']
  },
  tiebreaker: {
    type: Number,
    required: true
  }
});

function arrayLen(arr) {
  return arr.length === NUM_GAMES;
}

module.exports = Entry = mongoose.model('entry', EntrySchema);
