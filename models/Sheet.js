const mongoose = require('mongoose');

const NUM_GAMES = 15;

const SheetSchema = new mongoose.Schema({
  meta: {
    year: {
      type: Number,
      required: true
    },
    week: {
      type: Number,
      required: true
    }
  },
  games: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
      }
    ],
    validate: [arrayLen, '{PATH} must contain exactly 15 games'],
    required: true
  },
  tiebreakerIdx: {
    type: Number,
    required: true,
    default: NUM_GAMES - 1
  },
  open: {
    type: Boolean,
    default: true
  },
  entries: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'entry'
      }
    ],
    default: []
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  }
});

function arrayLen(arr) {
  return arr.length === NUM_GAMES;
}

module.exports = Sheet = mongoose.model('sheet', SheetSchema);
