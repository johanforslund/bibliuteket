import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_SEARCH_SUCCESS,
  BOOKS_SORT_BY,
  BOOKS_IS_SEARCHING
} from "../actions/types";

const INITIAL_STATE = {
  books: [],
  sorting: "dateASC",
  isSearching: false,
  searchText: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOKS_FETCH_SUCCESS:
      return { ...state, books: action.payload };
    case BOOKS_SEARCH_SUCCESS:
      return { ...state, books: action.payload };
    case BOOKS_SORT_BY:
      return { ...state, sorting: action.payload };
    case BOOKS_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.payload.isSearching,
        searchText: action.payload.searchText
      };
    default:
      return state;
  }
};
