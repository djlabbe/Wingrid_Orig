import { GET_GRID, GRID_ERROR } from '../actions/types';

const initialState = {
  entries: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_GRID:
      return {
        ...state,
        entries: payload,
        loading: false
      };
    case GRID_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
