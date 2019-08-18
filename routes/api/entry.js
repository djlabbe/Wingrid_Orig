const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Sheet = require('../../models/Sheet');
const Entry = require('../../models/Entry');
const { check, validationResult } = require('express-validator');

// @route       POST api/entry/
// @desc        Create an entry
// @access      Private
router.post(
  '/',
  [
    auth,
    check('winners', 'Winners list required')
      .not()
      .isEmpty(),
    check('sheet', 'Sheet is required')
      .not()
      .isEmpty(),
    check('tiebreaker', 'An integer tiebreaker is required').isInt()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { winners, tiebreaker, sheet } = req.body;

    try {
      let entry = new Entry({
        user: req.user.id,
        sheet,
        winners,
        tiebreaker
      });

      entry = await entry.save();

      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/entry/:sheet_id
// @desc        Get entry for current user by sheet id
// @access      Private
router.get('/:sheet_id/', auth, async (req, res) => {
  try {
    const entry = await Entry.findOne({
      sheet: req.params.sheet_id,
      user: req.user.id
    });
    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/entry/all/:sheet_id
// @desc        Get all entries for a single sheet
// @access      Public
router.get('/all/:sheet_id', async (req, res) => {
  try {
    const entries = await Entry.find({ sheet: req.params.sheet_id }).populate(
      'user',
      ['first', 'last']
    );
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
