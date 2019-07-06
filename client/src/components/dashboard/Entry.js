import React, { Fragment } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';
import validate from './validate';

const renderField = ({
  input,
  label,
  type,
  placeholder,
  meta: { touched, error }
}) => (
  <Fragment>
    <small className='form-text'>{label}</small>
    <div>
      <input {...input} type={type} placeholder={placeholder} />
      <small className='form-error'>
        {touched && error && <span>{error}</span>}
      </small>
    </div>
  </Fragment>
);

const renderGames = ({ games }) => (
  <Fragment>
    {games.map((game, idx) => (
      <Fragment key={game._id}>
        <Field
          component={RadioGroup}
          name={`game.${idx}`}
          options={[
            { title: game.awayTeam, value: game.awayTeam },
            { title: game.homeTeam, value: game.homeTeam }
          ]}
        />
      </Fragment>
    ))}
  </Fragment>
);

const Entry = ({
  sheet,
  handleSubmit, // ReduxForm
  onSubmit, // Custom impl from SheetNew
  onCancel,
  pristine,
  reset,
  submitting
}) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Entry</h1>
      <p className='lead'>
        {sheet.year} | Week {sheet.week}
      </p>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='my-2'>
          <table>
            <tbody>
              <FieldArray
                games={sheet.games}
                name='games'
                component={renderGames}
              />
              <tr>
                <td colSpan='2'>
                  <Field
                    name='tiebreaker'
                    type='text'
                    component={renderField}
                    label={
                      'Tiebreaker: ' +
                      sheet.games[sheet.tiebreakerIdx].awayTeam +
                      ' @ ' +
                      sheet.games[sheet.tiebreakerIdx].homeTeam
                    }
                    placeholder='Predict combined total points at end of game.'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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
            Clear
          </button>
          <div className='my-2'>
            <button
              type='button'
              className='btn btn-danger'
              disabled={submitting}
              onClick={onCancel}
            >
              Back
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

Entry.propTypes = {
  onCancel: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  validate,
  form: 'entryForm'
})(Entry);
