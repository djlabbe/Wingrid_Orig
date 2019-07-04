import React, { Fragment } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import validateEntry from './validateEntry';

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

const renderGames = ({ games, meta: { error, submitFailed } }) => (
  <Fragment>
    <small className='form-error'>
      {submitFailed && error && <span>{error}</span>}
    </small>
    <table>
      <thead>
        <tr>
          <th>Away Team</th>
          <th> vs. </th>
          <th>Home Team</th>
        </tr>
      </thead>
      <tbody>
        {games.map(game => (
          <tr key={game._id}>
            <td className='game-cell'>
              <label>
                <Field
                  name={game._id}
                  component='input'
                  type='radio'
                  value={game.awayTeam}
                />{' '}
                {game.awayTeam}
              </label>
            </td>
            <td className='game-cell'>@</td>
            <td className='game-cell'>
              <label>
                <Field
                  name={game._id}
                  component='input'
                  type='radio'
                  value={game.homeTeam}
                />{' '}
                {game.homeTeam}
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
          <FieldArray
            games={sheet.games}
            name='games'
            component={renderGames}
          />
        </div>

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
  validateEntry,
  form: 'entryForm'
})(Entry);
