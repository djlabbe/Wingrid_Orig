const validate = values => {
  const errors = {};

  var reg = new RegExp('^[0-9]+$');
  if (!reg.test(values.tiebreaker) || 0 > values.tiebreaker) {
    errors.tiebreaker = 'Please enter a whole number.';
  }
  if (!values.tiebreaker) {
    errors.tiebreaker = 'Please provide a tiebreaker.';
  }

  return errors;
};

export default validate;
