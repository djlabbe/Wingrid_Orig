import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllSheets } from '../../actions/sheet';

const renderSheetList = (onSelect, sheetList) => {
  return sheetList.map(sheet => {
    return (
      <div key={sheet._id}>
        <button
          className='btn btn-game'
          onClick={() => onSelect(sheet.year, sheet.week)}
        >
          {sheet.year} - Week #{sheet.week}
        </button>
      </div>
    );
  });
};

const SheetList = ({
  onSelect,
  getAllSheets,
  sheetData: { sheets, loading }
}) => {
  useEffect(() => {
    getAllSheets();
  }, [getAllSheets]);
  return loading || sheets === [] ? (
    <Fragment>
      <h1 className='large text-primary'>Contests</h1>
      <div className='my-2'>
        <Spinner />
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Contests</h1>
      <div className='my-2'>{renderSheetList(onSelect, sheets)}</div>
    </Fragment>
  );
};

SheetList.propTypes = {
  getAllSheets: PropTypes.func.isRequired,
  sheetData: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  sheetData: state.sheets
});

export default connect(
  mapStateToProps,
  { getAllSheets }
)(SheetList);
