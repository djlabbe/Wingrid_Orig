import React, { createRef, Fragment } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import validate from './validate';

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <div>
    <small className='form-text'>{label}</small>
    <div>
      <input {...input} type={type} placeholder={placeholder} />
      <small className='form-error'>
        {touched && error && <span>{error}</span>}
      </small>
    </div>
  </div>
);

const ref = createRef();

const SheetForm = ({
  handleSubmit, // ReduxForm
  onSurveySubmit, // Custom impl from SheetNew
  pristine,
  reset,
  submitting
}) => {
  const renderGames = ({ fields, meta: { error, submitFailed } }) => (
    <ul>
      <small className='form-error'>
        {submitFailed && error && <span>{error}</span>}
      </small>
      {fields.map((game, index) => (
        <li key={index} className='game-row'>
          <h4>Game #{index + 1}</h4>
          <Field
            name={`${game}.awayTeam`}
            type='text'
            component={renderField}
            label='Away Team'
            placeholder='Away'
          />
          <Field
            name={`${game}.homeTeam`}
            type='text'
            component={renderField}
            label='Home Team'
            placeholder='Home'
          />
          <Field
            name={`${game}.date`}
            type='text'
            component={renderField}
            label='Date'
            placeholder='09-09-2019'
          />
          <div className='my-1'>
            <button
              type='button'
              className='btn btn-danger'
              title='Remove Game'
              onClick={() => fields.remove(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
      <div className='my-1' ref={ref}>
        <button
          type='button'
          className='btn btn-dark'
          onClick={() => {
            fields.push({});
            ref.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }}
        >
          Add Game
        </button>
      </div>
    </ul>
  );
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Sheet</h1>

      <form className='form' onSubmit={handleSubmit(onSurveySubmit)}>
        <Field
          name='week'
          type='text'
          component={renderField}
          label='Week #'
          placeholder='3'
        />
        <Field
          name='year'
          type='text'
          component={renderField}
          label='Year'
          placeholder='2019'
        />
        <div className='my-2'>
          <FieldArray name='games' component={renderGames} />
        </div>
        <Field
          name='tiebreakerIdx'
          type='text'
          component={renderField}
          label='Tiebreaker Game #'
          placeholder='15'
        />

        <div className='my-2'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={submitting}
          >
            Submit
          </button>
          <button
            type='button'
            className='btn btn-danger'
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default reduxForm({
  validate,
  form: 'sheetForm',
  destroyOnUnmount: false
})(SheetForm);
