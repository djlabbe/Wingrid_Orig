import axios from 'axios';
import { setAlert } from './alert';

import { GET_SHEET, SHEET_ERROR } from './types';

// Get a sheet
export const getSheet = sheetId => async dispatch => {
  try {
    const res = await axios.get('/api/sheets/' + sheetId);

    dispatch({
      type: GET_SHEET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SHEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update sheet
export const createSheet = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(formData);

    const res = await axios.post('/api/sheets', formData, config);

    dispatch({
      type: GET_SHEET,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Sheet Updated' : 'Sheet Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: SHEET_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
