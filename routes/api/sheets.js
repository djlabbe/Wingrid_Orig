const express = require('express');
const router = express.Router();
const admin = require('../../middleware/admin');
const Game = require('../../models/Game');
const Team = require('../../models/Team');
const Sheet = require('../../models/Sheet');
const { check, validationResult } = require('express-validator');

// @route       POST api/sheets/
// @desc        Create a sheet
// @access      Private
router.post(
  '/',
  [
    //auth,
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
    const sheets = await Sheet.find().select('-entries -games -tiebreakerIdx');
    res.json(sheets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/sheets/:sheet_id
// @desc        Get sheet by id
// @access      Public
router.get('/:sheet_id', async (req, res) => {
  try {
    const sheet = await Sheet.findById(req.params.sheet_id);
    res.json(sheet);
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
    });
    console.log('HIT');
    res.json(sheet);
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
