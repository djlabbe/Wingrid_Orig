const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Team = require('../../models/Team');
const { check, validationResult } = require('express-validator');

// @route       POST api/teams/
// @desc        Create or update a team
// @access      Private @TODO ADMIN ONLY
router.post(
  '/',
  [
    auth,
    check('fullName', 'Team name is required')
      .not()
      .isEmpty(),
    check('nickName', 'Team nickname is required')
      .not()
      .isEmpty(),
    check('abbr', 'Please enter a 2 to 4 character abbreviation').isLength({
      min: 2,
      max: 4
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, nickName, abbr } = req.body;

    try {
      let team = await Team.findOne({ fullName });
      if (team) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Team with that name already exists' }] });
      }

      team = new Team({
        fullName,
        nickName,
        abbr
      });

      await team.save();
      res.json(team);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
