import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const renderGameList = gameList => {
  return gameList.map(game => {
    return (
      <div key={game._id}>
        {game.homeTeam} @ {game.awayTeam}
      </div>
    );
  });
};

const Entry = ({ sheet, onCancel, onSubmit }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>My Picks</h1>
      <h3 className='text-primary'>
        {sheet.year} | Week {sheet.week}
      </h3>
      <div className='my-2'>
        {renderGameList(sheet.games)}
        <div className='my-2'>
          <button className='btn btn-danger' type='cancel' onClick={onCancel}>
            Back
          </button>
          <button className='btn btn-primary' onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Entry.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  sheet: PropTypes.object.isRequired
};

export default Entry;
