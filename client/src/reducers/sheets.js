import { GET_SHEET, GET_ALL_SHEETS, SHEET_ERROR } from '../actions/types';

const initialState = {
  sheet: null,
  sheets: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SHEET:
      return {
        ...state,
        sheet: payload,
        loading: false
      };
    case GET_ALL_SHEETS:
      return {
        ...state,
        sheets: payload,
        loading: false
      };
    case SHEET_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
