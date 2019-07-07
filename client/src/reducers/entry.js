import { GET_ENTRY, ENTRY_ERROR } from '../actions/types';

const initialState = {
  entry: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ENTRY:
      return {
        ...state,
        entry: payload ? payload : null,
        loading: false
      };
    case ENTRY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
