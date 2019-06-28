const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    pinterest: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
