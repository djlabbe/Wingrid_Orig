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
