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
    //   admin,
    check('meta', 'Metadata is required').exists(),
    check('gameList', 'Games are required.').exists(),
    check('tiebreakerIdx', 'Tiebreaker game index is required')
      .optional()
      .isNumeric()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { meta, gameList, tiebreakerIdx } = req.body;

    const year = meta.year;
    const week = meta.week;

    try {
      let games = [];

      for (const gameData of gameList) {
        let home_team = await Team.findOne({ fullName: gameData.home_name });
        let away_team = await Team.findOne({ fullName: gameData.away_name });

        if (!home_team) {
          return res.status(400).json({
            errors: [{ msg: gameData.home_name + ' team does not exist' }]
          });
        }

        if (!away_team) {
          return res.status(400).json({
            errors: [{ msg: gameData.away_name + ' team does not exist' }]
          });
        }

        let game = await Game.findOne({
          home_team,
          away_team,
          date: gameData.date
        });

        if (!game) {
          game = new Game({
            away_team,
            home_team,
            date: gameData.date
          });

          await game.save();
        }

        games.push(game.id);
      }

      // All games retrieved or created and added to array
      // Create new Sheet
      let sheet = new Sheet({
        meta: {
          year,
          week
        },
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
    const sheets = await Sheet.find();
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
    const sheet = await Sheet.findById(req.params.sheet_id).populate({
      path: 'games',
      populate: { path: 'away_team home_team' }
    });
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
    // Remove profile
    await Sheet.findByIdAndRemove(req.params.sheet_id);
    res.json({ msg: 'Sheet deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
