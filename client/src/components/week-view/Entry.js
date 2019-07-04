import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSheet } from '../../actions/sheet';

const Entry = ({ getSheet, sheetData: { sheet, loading } }) => {
  useEffect(() => {
    getSheet();
  }, []);

  return loading && sheet === [] ? (
    <div className='my-2'>
      <h2 className='lead text-primary'>Pick Sheets</h2>
      <Spinner />
    </div>
  ) : (
    <div className='my-2'>
      <h2 className='lead text-primary'>Your Picks</h2>
      THIS IS A SHEET
    </div>
  );
};

Entry.propTypes = {
  getSheet: PropTypes.func.isRequired,
  sheetData: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return { sheetData: state.sheets };
};

export default connect(
  mapStateToProps,
  { getSheet }
)(Entry);
