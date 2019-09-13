import { createSelector } from "reselect";
import Fuse from "fuse.js";

const booksSelector = state => state.books.bookList;
const sortingSelector = state => state.books.sorting;
const searchTextSelector = state => state.books.searchText;

export const getBooks = createSelector(
  [booksSelector, sortingSelector, searchTextSelector],
  (books, sorting, searchText) => {
    const bookList = Object.keys(books).map(key => {
      return books[key];
    });

    let sortingFunction;
    switch (sorting) {
      case "dateASC":
        sortingFunction = (a, b) => {
          return a.date - b.date;
        };
        break;
      case "dateDESC":
        sortingFunction = (a, b) => {
          return -(a.date - b.date);
        };
        break;
      case "priceASC":
        sortingFunction = (a, b) => {
          return a.price - b.price;
        };
        break;
      case "priceDESC":
        sortingFunction = (a, b) => {
          return -(a.price - b.price);
        };
        break;
      default:
        break;
    }

    const sortedBooks = bookList.sort(sortingFunction);

    if (searchText === "") return sortedBooks;

    var options = {
      keys: ["title", "author"],
      shouldSort: false,
      threshold: 0.4
    };
    var fuse = new Fuse(sortedBooks, options);
    const search = fuse.search(searchText);

    return search;
  }
);
