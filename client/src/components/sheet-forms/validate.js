import _ from 'lodash';
import formFields from './formFields';

const validate = values => {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
};

export default validate;
