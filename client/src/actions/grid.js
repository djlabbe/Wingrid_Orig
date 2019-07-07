import axios from 'axios';
import { setAlert } from './alert';
import { GET_GRID, GRID_ERROR } from './types';

// Get all sheets for a single challenge
export const getGrid = sheetId => async dispatch => {
  try {
    const res = await axios.get(`/api/entry/all/${sheetId}`);
    dispatch({
      type: GET_GRID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GRID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
