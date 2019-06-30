const express = require('express');
const router = express.Router();
const admin = require('../../middleware/admin');
const Game = require('../../models/Game');
const Team = require('../../models/Team');
const { check, validationResult } = require('express-validator');

// @route       POST api/games/
// @desc        Create a game
// @access      Private
router.post(
  '/',
  [
    //   admin,
    check('away_name', 'Away team name is required')
      .not()
      .isEmpty(),
    check('home_name', 'Home team name is required')
      .not()
      .isEmpty(),
    check('date', 'Invalid date. Format must be YYYY-MM-DD').isISO8601()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { home_name, away_name, date } = req.body;

    try {
      console.log(away_name);

      let home_team = await Team.findOne({ fullName: home_name });
      let away_team = await Team.findOne({ fullName: away_name });

      if (!home_team) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Home team does not exist' }] });
      }

      if (!away_team) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Away team does not exist' }] });
      }

      let game = await Game.findOne({
        home_team,
        away_team,
        date
      });

      if (game) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Game already exists' }] });
      }

      // Create new game
      game = new Game({
        away_team,
        home_team,
        date
      });

      await game.save();
      res.json(game);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
