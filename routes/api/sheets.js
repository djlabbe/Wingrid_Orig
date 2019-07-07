const express = require('express');
const router = express.Router();
const admin = require('../../middleware/admin');
const auth = require('../../middleware/auth');
const Sheet = require('../../models/Sheet');
const Entry = require('../../models/Entry');
const { check, validationResult } = require('express-validator');

// @route       POST api/sheets/
// @desc        Create a sheet
// @access      Private
router.post(
  '/',
  [
    auth,
    check('year', 'Year is required')
      .not()
      .isEmpty(),
    check('week', 'Year is required')
      .not()
      .isEmpty(),
    check('games', 'Game data is required')
      .not()
      .isEmpty(),
    check('tiebreakerIdx', 'Tiebreaker game is required').isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { year, week, games, tiebreakerIdx } = req.body;

    try {
      let sheet = new Sheet({
        year,
        week,
        games,
        tiebreakerIdx
      });

      await sheet.save();

      res.json(sheet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/sheets/
// @desc        Get all sheets
// @access      Public
router.get('/', async (req, res) => {
  try {
    const sheets = await Sheet.find().sort([['year', -1], ['week', -1]]);
    res.json(sheets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/sheets/:sheet_id
// @desc        Get sheet by id
// @access      Private
router.get('/:sheet_id', async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.sheet_id);
    res.json(sheet);
    const entry = await Entry.findOne({ sheet: req.params.sheet_id });
    sheet.entry = entry;
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/sheets/:year/:week
// @desc        Get sheet by year and week
// @access      Private
router.get('/:year/:week', async (req, res) => {
  try {
    const sheet = await Sheet.findOne({
      year: req.params.year,
      week: req.params.week
    }).populate('entries');

    const entry = await Entry.findOne({ sheet: sheet._id });

    const resp = {
      sheet,
      entry
    };

    res.json(resp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/sheets/:sheet_id
// @desc        Delete profile, user & user's entries
// @access      Private
router.delete('/:sheet_id', async (req, res) => {
  try {
    await Sheet.findByIdAndRemove(req.params.sheet_id);
    res.json({ msg: 'Sheet deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
