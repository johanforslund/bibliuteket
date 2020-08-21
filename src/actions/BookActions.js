import firebase from "react-native-firebase"; //eslint-disable-line
import {
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_FAIL,
  BOOKS_FETCH_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_EDIT_SUCCESS,
  BOOK_EDIT_FAIL,
  BOOK_EDIT_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOKS_SEARCH_UPDATE,
  BOOKS_SORT_BY
} from "./types";
import NavigationService from "../navigation/NavigationService";
import Toast from "react-native-root-toast";

export const booksFetch = () => {
  return dispatch => {
    dispatch({ type: BOOKS_FETCH_REQUEST });
    firebase
      .database()
      .ref("books")
      .orderByChild("sold")
      .equalTo(false)
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
  location,
  phone,
  imageURL,
  price,
  title,
  messengerName,
  tags,
  programs,
  courses,
  isbn,
  storedBookID
}) => {
  price ? (price = parseInt(price)) : null;
  const { currentUser } = firebase.auth();
  const name = currentUser.displayName;
  const sold = false;

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
        location,
        phone,
        imageURL,
        price,
        name,
        title,
        messengerName,
        tags,
        programs,
        courses,
        isbn,
        storedBookID,
        sold
      })
      .then(() => {
        dispatch({ type: BOOK_CREATE_SUCCESS });
        NavigationService.popToTop();
        NavigationService.navigate("BookList");
      })
      .catch(err => dispatch({ type: BOOK_CREATE_FAIL, payload: err.message }));
  };
};

export const bookEdit = (
  uid,
  {
    author,
    description,
    location,
    phone,
    imageURL,
    price,
    title,
    messengerName,
    tags
  }
) => {
  price ? (price = parseInt(price)) : null;

  return dispatch => {
    dispatch({ type: BOOK_EDIT_REQUEST });

    firebase
      .database()
      .ref(`books/${uid}`)
      .update({
        author,
        description,
        location,
        phone,
        imageURL,
        price,
        title,
        messengerName,
        tags
      })
      .then(() => {
        dispatch({ type: BOOK_EDIT_SUCCESS });
        NavigationService.popToTop();
        Toast.show("Din annons har blivit uppdaterad");
      })
      .catch(err => dispatch({ type: BOOK_EDIT_FAIL, payload: err.message }));
  };
};

export const bookDelete = (uid, imageURL, action) => {
  if (action === "sell") {
    return dispatch => {
      dispatch({ type: BOOK_DELETE_REQUEST });
      firebase
        .database()
        .ref(`books/${uid}`)
        .update({ sold: true })
        .then(() => deleteBookSuccess(dispatch, imageURL))
        .catch(err => deleteBookFail(err, dispatch));
    };
  } else if (action === "delete") {
    return dispatch => {
      dispatch({ type: BOOK_DELETE_REQUEST });
      firebase
        .database()
        .ref(`books/${uid}`)
        .remove()
        .then(() => deleteBookSuccess(dispatch, imageURL))
        .catch(err => deleteBookFail(err, dispatch));
    };
  }
};

const deleteBookSuccess = (dispatch, imageURL) => {
  dispatch({ type: BOOK_DELETE_SUCCESS });

  const image = firebase.storage().refFromURL(imageURL);
  image
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.log(error);
      // Uh-oh, an error occurred!
    });
};

const deleteBookFail = (err, dispatch) => {
  dispatch({ type: BOOK_DELETE_FAIL, payload: err.message });
};
