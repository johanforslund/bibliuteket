import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_SORT_BY,
  BOOKS_SEARCH_UPDATE
} from "../actions/types";

const INITIAL_STATE = {
  bookList: [],
  sorting: "dateDESC",
  searchText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKS_FETCH_SUCCESS:
      return { ...state, bookList: action.payload };
    case BOOKS_SORT_BY:
      return { ...state, sorting: action.payload };
    case BOOKS_SEARCH_UPDATE:
      return { ...state, searchText: action.payload };
    default:
      return state;
  }
};
