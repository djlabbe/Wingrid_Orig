// Manages the state of the week -
// Shows the user an entry form if they have not yet made picks,
// shows the grid once picks have been submitted.

import React, { Fragment, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Entry from './Entry';
import Grid from './Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSheet } from '../../actions/sheet';

const WeekView = ({
  year,
  week,
  getSheet,
  onCancel,
  sheetData: { sheet, loading }
}) => {
  useEffect(() => {
    getSheet(year, week);
  }, [getSheet]);
  const [showGrid, setShowGrid] = useState(false);

  if (loading || sheet === null) {
    return <Spinner />;
  }

  if (showGrid) {
    return (
      <Grid
        onCancel={() => setShowGrid(true)}
        sheet={sheet}
        onCancel={onCancel}
      />
    );
  }

  return (
    <Entry
      sheet={sheet}
      onSubmit={() => setShowGrid(true)}
      onCancel={onCancel}
    />
  );
};

WeekView.propTypes = {
  getSheet: PropTypes.func.isRequired,
  sheetData: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { sheetData: state.sheets };
};

export default connect(
  mapStateToProps,
  { getSheet }
)(WeekView);
