import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { getGrid } from '../../actions/grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Grid = ({ sheet, onCancel, getGrid, grid, loading }) => {
  useEffect(() => {
    getGrid(sheet._id);
  }, [getGrid, sheet._id]);

  const renderNameRow = entries => {
    return entries.map(entry => {
      return (
        <td className='grid-cell grid-header' key={entry._id}>
          {entry.user.first} {entry.user.last}
        </td>
      );
    });
  };

  const renderTiebreakerRow = entries => {
    return entries.map(entry => {
      return (
        <td className='grid-cell' key={entry._id}>
          {entry.tiebreaker}
        </td>
      );
    });
  };

  const renderGameRow = gameIdx => {
    return grid.entries.map(entry => {
      return (
        <td className='grid-cell' key={entry._id}>
          {entry.winners[gameIdx]}
        </td>
      );
    });
  };

  const renderGameRows = games => {
    return games.map((game, gameIdx) => {
      return <tr key={game._id}>{renderGameRow(gameIdx)}</tr>;
    });
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <h1 className='large text-primary'>
        Grid | {sheet.year} Week {sheet.week}
      </h1>
      <div className='grid-container'>
        <table className='grid-table'>
          <thead>
            <tr>{renderNameRow(grid.entries)}</tr>
          </thead>
          <tbody>
            {renderGameRows(sheet.games)}
            <tr>{renderTiebreakerRow(grid.entries)}</tr>
          </tbody>
        </table>
        <div className='my-2'>
          <button className='btn btn-danger' type='cancel' onClick={onCancel}>
            Back
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Grid.propTypes = {
  sheet: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  getGrid: PropTypes.func.isRequired,
  grid: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { auth: state.auth, grid: state.grid };
};

export default connect(
  mapStateToProps,
  { getGrid }
)(Grid);
