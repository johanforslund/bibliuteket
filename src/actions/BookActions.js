import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import "@firebase/database"; //eslint-disable-line
import {
  BOOKS_FETCH_SUCCESS,
  BOOK_CREATE,
  BOOKS_SEARCH_SUCCESS,
  BOOKS_SEARCH_UPDATE,
  BOOKS_SORT_BY,
  BOOKS_IS_SEARCHING
} from "./types";
import NavigationService from "../navigation/NavigationService";

export const booksFetch = sorting => {
  return dispatch => {
    firebase
      .database()
      .ref("books")
      .orderByChild(sorting)
      .on("value", snapshot => {
        const books = [];
        snapshot.forEach(child => {
          const childWithUid = { ...child.val(), uid: child.key };
          books.push(childWithUid);
        });
        books.reverse();
        dispatch({ type: BOOKS_FETCH_SUCCESS, payload: books });
      });
  };
};

export const booksSearch = (sorting, value) => {
  return dispatch => {
    firebase
      .database()
      .ref("books")
      .orderByChild(sorting)
      .once("value", snapshot => {
        const books = [];
        snapshot.forEach(child => {
          if (
            child
              .val()
              .title.toLowerCase()
              .includes(value.toLowerCase().trim())
          ) {
            const childWithUid = { ...child.val(), uid: child.key };
            books.push(childWithUid);
          }
        });
        books.reverse();
        dispatch({ type: BOOKS_SEARCH_SUCCESS, payload: books });
      });
  };
};

export const searchUpdate = searchTitle => {
  return {
    type: BOOKS_SEARCH_UPDATE,
    payload: searchTitle
  };
};

export const toggleSearch = (isSearching, searchText) => {
  return {
    type: BOOKS_IS_SEARCHING,
    payload: { isSearching: isSearching, searchText: searchText }
  };
};

export const changeSorting = sorting => {
  return {
    type: BOOKS_SORT_BY,
    payload: sorting
  };
};

export const bookCreate = ({
  author,
  date,
  description,
  email,
  location,
  phone,
  imageURL,
  price,
  title,
  messengerName,
  tags
}) => {
  price ? (price = parseInt(price)) : null;
  const { currentUser } = firebase.auth();
  const name = currentUser.displayName;

  return dispatch => {
    firebase
      .database()
      .ref("/books")
      .push({
        author,
        date,
        user: currentUser.uid,
        description,
        email,
        location,
        phone,
        imageURL,
        price,
        name,
        title,
        messengerName,
        tags
      })
      .then(() => {
        dispatch({ type: BOOK_CREATE });
        NavigationService.navigate("BookList");
      });
  };
};

export const bookDelete = ({ uid, imageURL }) => {
  return () => {
    firebase
      .database()
      .ref(`books/${uid}`)
      .remove()
      .then(() => {
        NavigationService.navigate("BookList");
      });

    if (imageURL) {
      const image = firebase.storage().refFromURL(imageURL);

      image
        .delete()
        .then(function() {})
        .catch(function(error) {
          console.log(error);
          // Uh-oh, an error occurred!
        });
    }
  };
};
