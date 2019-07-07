import React, { Fragment } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';
import { submitEntry } from '../../actions/entry';
import validate from './validate';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
          name={`winners.${idx}`}
          options={[
            { title: game.awayTeam, value: game.awayTeam },
            { title: game.homeTeam, value: game.homeTeam }
          ]}
        />
      </Fragment>
    ))}
  </Fragment>
);

let Entry = ({
  history,
  sheet,
  submitEntry,
  handleSubmit, // ReduxForm
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
      <form
        className='form'
        onSubmit={handleSubmit(values => {
          submitEntry(values, sheet._id, history);
          onCancel();
        })}
      >
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
  handleSubmit: PropTypes.func.isRequired,
  submitEntry: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired
};

Entry = connect(
  null,
  { submitEntry }
)(Entry);

export default reduxForm({
  validate,
  form: 'entryForm'
})(withRouter(Entry));
