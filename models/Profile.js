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
  social: {
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    pinterest: {
      type: String
    },
    youtube: {
      type: String
    }
  }
});

ProfileSchema.set('timestamps', true);

module.exports = Profile = mongoose.model('profile', ProfileSchema);
