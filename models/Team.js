const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  nickName: {
    type: String
  },
  abbr: {
    type: String,
    required: true
  }
});

module.exports = Team = mongoose.model('team', TeamSchema);
