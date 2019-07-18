import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Challenge from './Challenge';
import { connect } from 'react-redux';
import { getAllSheets } from '../../actions/sheet';

const Dashboard = ({ getAllSheets, sheetData: { sheets, loading } }) => {
  useEffect(() => {
    getAllSheets();
  }, [getAllSheets]);

  const [selectedSheet, selectSheet] = useState(null);

  const renderChallenges = challenges => {
    return challenges.map(sheet => {
      return (
        <div key={sheet._id}>
          <button
            className='btn btn-game'
            onClick={() => {
              selectSheet(sheet);
            }}
          >
            {sheet.year} | Week {sheet.week}
          </button>
        </div>
      );
    });
  };

  if (loading || sheets === []) {
    return <Spinner />;
  }
  if (!selectedSheet) {
    return (
      <Fragment>
        <h2 className='large text-primary'>Challenges</h2>
        <p>
          Select a challenge to submit your picks or view the grid.
          <p>
            <small>
              Note: Each grid is only visible after you submit your picks.
            </small>
          </p>
        </p>
        <h3 className='text-primary my-1'>Current</h3>
        <div className='my-1'>{renderChallenges(sheets.slice(0, 2))}</div>
        <h3 className='text-primary my-1'>Archived</h3>
        <div className='my-1'>
          {renderChallenges(sheets.slice(2, sheets.length))}
        </div>
      </Fragment>
    );
  }
  return (
    <Challenge
      sheet={selectedSheet}
      onCancel={() => {
        selectSheet(null);
      }}
    />
  );
};

Dashboard.propTypes = {
  getAllSheets: PropTypes.func.isRequired,
  sheetData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sheetData: state.sheets
});

export default connect(
  mapStateToProps,
  { getAllSheets }
)(Dashboard);
