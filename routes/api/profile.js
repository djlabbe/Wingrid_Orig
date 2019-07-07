const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['first', 'last']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/profile/
// @desc        Update user profile
// @access      Private
router.post('/', auth, async (req, res) => {
  const {
    location,
    bio,
    youtube,
    twitter,
    facebook,
    pinterest,
    instagram
  } = req.body;

  // Build profile object

  const profileFields = {};
  profileFields.user = req.user.id;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (pinterest) profileFields.social.pinterest = pinterest;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // Update
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/profile/
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['first', 'last']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['first', 'last']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/profile/
// @desc        Delete profile, user & user's entries
// @access      Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
