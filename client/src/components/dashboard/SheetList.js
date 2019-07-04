import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSheets } from '../../actions/sheet';

const renderSheetList = sheetList => {
  return sheetList.map(sheet => {
    return (
      <div key={sheet._id}>
        {sheet.year} - Week #{sheet.week}
      </div>
    );
  });
};

const SheetList = ({ getAllSheets, sheetData: { sheets, loading } }) => {
  useEffect(() => {
    getAllSheets();
  }, [getAllSheets]);

  return loading && sheets === [] ? (
    <div className='my-2'>
      <h2 className='lead text-primary'>Pick Sheets</h2>
      <Spinner />
    </div>
  ) : (
    <div className='my-2'>
      <h2 className='lead text-primary'>Your Picks</h2>
      {renderSheetList(sheets)}
    </div>
  );
};

SheetList.propTypes = {
  getAllSheets: PropTypes.func.isRequired,
  sheetData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sheetData: state.sheets
});

export default connect(
  mapStateToProps,
  { getAllSheets }
)(SheetList);
