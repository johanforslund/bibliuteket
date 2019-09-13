import firebase from "@firebase/app"; //eslint-disable-line
import "@firebase/auth"; //eslint-disable-line
import "@firebase/database"; //eslint-disable-line
import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAIL,
  BOOKS_FETCH_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOKS_SEARCH_UPDATE,
  BOOKS_SORT_BY
} from "./types";
import NavigationService from "../navigation/NavigationService";

export const booksFetch = () => {
  return dispatch => {
    dispatch({ type: BOOKS_FETCH_REQUEST });
    firebase
      .database()
      .ref("books")
      .on("value", snapshot => {
        const books = [];
        snapshot.forEach(child => {
          const childWithUid = { ...child.val(), uid: child.key };
          books.push(childWithUid);
        });

        dispatch({ type: BOOKS_FETCH_SUCCESS, payload: books });
      });
  };
};

export const searchUpdate = searchText => {
  return {
    type: BOOKS_SEARCH_UPDATE,
    payload: searchText
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
    dispatch({ type: BOOK_CREATE_REQUEST });
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
        dispatch({ type: BOOK_CREATE_SUCCESS });
        NavigationService.navigate("BookList");
      })
      .catch(err => dispatch({ type: BOOK_CREATE_FAIL, payload: err.message }));
  };
};

export const bookDelete = (uid, imageURL) => {
  return dispatch => {
    dispatch({ type: BOOK_DELETE_REQUEST });
    firebase
      .database()
      .ref(`books/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: BOOK_DELETE_SUCCESS });

        const image = firebase.storage().refFromURL(imageURL);
        image
          .delete()
          .then(function() {})
          .catch(function(error) {
            console.log(error);
            // Uh-oh, an error occurred!
          });
      })
      .catch(err => dispatch({ type: BOOK_DELETE_FAIL, payload: err.message }));
  };
};
