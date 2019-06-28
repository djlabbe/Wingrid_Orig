const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  away_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: true
  },
  home_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: true
  },
  away_score: {
    type: Number,
    default: null
  },
  home_score: {
    type: Number,
    default: null
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Team = mongoose.model('game', GameSchema);
