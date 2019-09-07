import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_SEARCH_SUCCESS,
  BOOKS_SORT_BY
} from "../actions/types";

const INITIAL_STATE = {
  books: [],
  sorting: "date"
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKS_FETCH_SUCCESS:
      return { ...state, books: action.payload };
    case BOOKS_SEARCH_SUCCESS:
      return { ...state, books: action.payload };
    case BOOKS_SORT_BY:
      return { ...state, sorting: action.payload };
    default:
      return state;
  }
};
