const validate = values => {
  const errors = {};

  const numValue = parseInt(values.tiebreaker);

  if (isNaN(numValue) || 0 > numValue) {
    errors.tiebreaker = 'Please enter a positive integer.';
  }
  if (!values.tiebreaker) {
    errors.tiebreaker = 'Please enter a tiebreaker.';
  }

  return errors;
};

export default validate;
