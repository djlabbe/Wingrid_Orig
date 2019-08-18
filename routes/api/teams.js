const express = require('express');
const router = express.Router();
const admin = require('../../middleware/admin');
const Team = require('../../models/Team');
const { check, validationResult } = require('express-validator');

// @route       POST api/teams/
// @desc        Create or update a team
// @access      Admin
router.post(
  '/',
  [
    admin,
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

// @route       GET api/teams/
// @desc        Get all teams
// @access      Public
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/teams/:team_id
// @desc        Get team by ID
// @access      Public
router.get('/:team_id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.team_id);

    if (!team) return res.status(400).json({ msg: 'Team not found' });

    res.json(team);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Team not found' });
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/teams/:team_id
// @desc        Delete team
// @access      Admin
router.delete('/:team_id', admin, async (req, res) => {
  try {
    // Remove team
    await Team.findOneAndRemove({ _id: req.params.team_id });

    res.json({ msg: 'Team deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
