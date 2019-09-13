import { createSelector } from "reselect";

const booksSelector = state => state.books.bookList;
const sortingSelector = state => state.books.sorting;
const searchTextSelector = state => state.books.searchText;

export const getBooks = createSelector(
  [booksSelector, sortingSelector, searchTextSelector],
  (books, sorting, searchText) => {
    return Object.keys(books)
      .map(key => {
        return books[key];
      })
      .filter(book => book.title === searchText);
  }
);
