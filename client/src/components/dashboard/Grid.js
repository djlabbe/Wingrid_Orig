import React, { Fragment } from 'react';

const Grid = ({ sheet, onCancel }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Grid</h1>
      <div className='my-2'>
        <button className='btn btn-danger' type='cancel' onClick={onCancel}>
          Back
        </button>
      </div>
    </Fragment>
  );
};

export default Grid;
