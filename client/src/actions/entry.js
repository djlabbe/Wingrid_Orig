import axios from 'axios';
import { setAlert } from './alert';

import { GET_ENTRY, ENTRY_ERROR } from './types';

// Submit an entry for a sheet
export const submitEntry = (
  formData,
  sheetId,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    formData.sheet = sheetId;

    await axios.post('/api/entry/', formData, config);

    dispatch(setAlert('Submission Saved', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a sheet with entry for current user
export const getEntry = sheetId => async dispatch => {
  try {
    const res = await axios.get(`/api/entry/${sheetId}`);
    dispatch({
      type: GET_ENTRY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ENTRY_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
