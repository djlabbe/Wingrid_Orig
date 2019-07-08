const validate = values => {
  const errors = {};

  if (!values.week) {
    errors.week = 'Required';
  }
  if (!values.year) {
    errors.year = 'Required';
  }
  if (!values.tiebreakerIdx) {
    errors.tiebreakerIdx = 'Required';
  }

  var reg = new RegExp('^[0-9]+$');
  if (!reg.test(values.tiebreakerIdx) || values.tiebreakerIdx <= 0) {
    errors.tiebreakerIdx = 'Hmmm... please rethink this...';
  }

  if (values.games && values.tiebreakerIdx > values.games.length) {
    if (values.games.length !== 0) {
      errors.tiebreakerIdx =
        'Please enter a valid game number between 1 and ' + values.games.length;
    } else {
      errors.tiebreakerIdx = "You're going to need to add a game...";
    }
  }

  if (!values.games || !values.games.length) {
    errors.games = { _error: 'At least one game must be entered' };
  } else {
    const gamesArrayErrors = [];
    values.games.forEach((game, gameIndex) => {
      const gameErrors = {};
      if (!game || !game.homeTeam) {
        gameErrors.homeTeam = 'Required';
        gamesArrayErrors[gameIndex] = gameErrors;
      }
      if (!game || !game.awayTeam) {
        gameErrors.awayTeam = 'Required';
        gamesArrayErrors[gameIndex] = gameErrors;
      }
      if (!game || !game.date) {
        gameErrors.date = 'Required';
        gamesArrayErrors[gameIndex] = gameErrors;
      }
    });
    if (gamesArrayErrors.length) {
      errors.games = gamesArrayErrors;
    }
  }
  return errors;
};

export default validate;
