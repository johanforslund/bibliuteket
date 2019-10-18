import { BOOKS_PROFILE_FETCH_SUCCESS } from "../actions/types";
import { BOOKS_FETCH_MONITORED_SUCCESS } from "../actions/types";
const INITIAL_STATE = {
  profileBooks: [],
  monitoredBooks: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKS_PROFILE_FETCH_SUCCESS:
      const profileBooks = action.payload;
      return { ...state, profileBooks };
    case BOOKS_FETCH_MONITORED_SUCCESS:
      const monitoredBooks = action.payload;
      return { ...state, monitoredBooks };
    default:
      return state;
  }
};
