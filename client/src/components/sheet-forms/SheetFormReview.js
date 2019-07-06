import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSheet } from '../../actions/sheet';

const SheetFormReview = ({ onCancel, formValues, createSheet, history }) => {
  console.log(formValues);
  const renderGames = formValues.games.map((game, idx) => {
    return (
      <div key={idx}>
        <label>Game {idx + 1}</label>
        <div>
          {game.awayTeam} @ {game.homeTeam}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm Sheet data</h5>

      <div>
        <label>Year: </label> {formValues.year}
      </div>

      <div>
        <label>Week: </label> {formValues.week}
      </div>

      <div>
        <label>Games </label>
        {renderGames}
      </div>

      <div>
        <label>Tiebreaker</label>
        <div>{formValues.tiebreakerIdx}</div>
      </div>

      <button className='btn btn-danger' type='cancel' onClick={onCancel}>
        Back
      </button>
      <button className='btn' onClick={() => createSheet(formValues, history)}>
        Save Sheet
      </button>
    </div>
  );
};

SheetFormReview.propTypes = {
  onCancel: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { formValues: state.form.sheetForm.values };
}

export default connect(
  mapStateToProps,
  { createSheet }
)(withRouter(SheetFormReview));
