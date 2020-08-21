import firebase from "react-native-firebase"; //eslint-disable-line
import NavigationService from "../navigation/NavigationService";
import {
  BOOKS_PROFILE_FETCH_SUCCESS,
  BOOKS_FETCH_MONITORED_SUCCESS,
  BOOKS_FETCH_MONITORED_REQUEST,
  BOOK_MONITOR_ADD_REQUEST,
  BOOK_MONITOR_ADD_SUCCESS,
  BOOK_MONITOR_ADD_FAIL,
  BOOK_MONITOR_DELETE_REQUEST,
  BOOK_MONITOR_DELETE_SUCCESS,
  BOOK_MONITOR_DELETE_FAIL
} from "./types";

export const profileBooksFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref("books")
      .orderByChild("user")
      .equalTo(currentUser.uid)
      .on("value", snapshot => {
        const profileBooks = [];
        snapshot.forEach(child => {
          const childWithUid = { ...child.val(), uid: child.key };
          if (!childWithUid.sold) profileBooks.push(childWithUid);
        });
        profileBooks.reverse();
        dispatch({ type: BOOKS_PROFILE_FETCH_SUCCESS, payload: profileBooks });
      });
  };
};

export const monitorBooksFetch = () => {
  const { currentUser } = firebase.auth();

  return dispatch => {
    dispatch({ type: BOOKS_FETCH_MONITORED_REQUEST });
    firebase
      .database()
      .ref("bookFollows")
      .orderByChild(currentUser.uid)
      .equalTo(true)
      .on("value", snapshot => {
        const promises = [];
        const bookIDs = [];
        snapshot.forEach(child => {
          const bookID = child.key;
          const promise = firebase
            .database()
            .ref("storedBooks/" + child.key)
            .once("value");
          bookIDs.push(bookID);
          promises.push(promise);
        });
        let monitoredBooks = [{}];
        Promise.all(promises).then(snapshots => {
          monitoredBooks = snapshots.map((snapshot, i) => {
            return {
              uid: bookIDs[i],
              ...snapshot.val()
            };
          });
          dispatch({
            type: BOOKS_FETCH_MONITORED_SUCCESS,
            payload: monitoredBooks
          });
        });
      });
  };
};

export const monitorBookAdd = storedBookID => {
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;

  return dispatch => {
    dispatch({ type: BOOK_MONITOR_ADD_REQUEST }); // add ADD to type
    firebase
      .database()
      .ref("/bookFollows/" + storedBookID + "/" + userId)
      .set(true)
      .then(() => {
        NavigationService.navigate("MonitorBook");
        dispatch({ type: BOOK_MONITOR_ADD_SUCCESS });
      })
      .catch(err =>
        dispatch({ type: BOOK_MONITOR_ADD_FAIL, payload: err.message })
      );
  };
};

export const monitorBookDelete = bookID => {
  const { currentUser } = firebase.auth();
  const userID = currentUser.uid;

  return dispatch => {
    dispatch({ type: BOOK_MONITOR_DELETE_REQUEST });
    firebase
      .database()
      .ref(`bookFollows/${bookID}/${userID}`)
      .remove()
      .then(() => dispatch({ type: BOOK_MONITOR_DELETE_SUCCESS }))
      .catch(err =>
        dispatch({ type: BOOK_MONITOR_DELETE_FAIL, payload: err.message })
      );
  };
};
