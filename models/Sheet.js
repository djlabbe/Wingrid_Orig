const mongoose = require('mongoose');

const SheetSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  week: {
    type: Number,
    required: true
  },
  games: [
    {
      awayTeam: {
        type: String,
        required: true
      },
      homeTeam: {
        type: String,
        required: true
      },
      homeScore: {
        type: Number,
        default: null
      },
      awayScore: {
        type: Number,
        default: null
      }
    }
  ],
  tiebreakerIdx: {
    type: Number,
    required: true
  },
  open: {
    type: Boolean,
    default: true
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  }
});

module.exports = Sheet = mongoose.model('sheet', SheetSchema);
