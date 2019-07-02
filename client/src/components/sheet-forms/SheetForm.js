import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const SheetForm = ({ handleSubmit, pristine, reset, submitting }) => {
  const renderGames = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <li>
        <button type='button' onClick={() => fields.push({})}>
          Add Game
        </button>
        {submitFailed && error && <span>{error}</span>}
      </li>
      {fields.map((game, index) => (
        <li key={index}>
          <h4>Game #{index + 1}</h4>
          <Field
            name={`${game}.awayTeam`}
            type='text'
            component={renderField}
            label='Away Team'
          />
          <Field
            name={`${game}.homeTeam`}
            type='text'
            component={renderField}
            label='Home Team'
          />
          <Field
            name={`${game}.date`}
            type='text'
            component={renderField}
            label='Date'
          />
          <button
            type='button'
            title='Remove Game'
            onClick={() => fields.remove(index)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Field name='week' type='text' component={renderField} label='Week #' />
        <Field name='year' type='text' component={renderField} label='Year' />
        <FieldArray name='games' component={renderGames} />
        <Field
          name='tiebreakerIdx'
          type='text'
          component={renderField}
          label='Tiebreaker Game #'
        />

        <div>
          <button type='submit' disabled={submitting}>
            Submit
          </button>
          <button
            type='button'
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  validate,
  form: 'sheetForm',
  destroyOnUnmount: false
})(SheetForm);
