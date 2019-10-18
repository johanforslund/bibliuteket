import firebase from "react-native-firebase"; //eslint-disable-line
import NavigationService from "../navigation/NavigationService";
import {
  BOOKS_PROFILE_FETCH_SUCCESS,
  BOOKS_FETCH_MONITORED_SUCCESS,
  BOOK_MONITOR_REQUEST,
  BOOK_MONITOR_SUCCESS,
  BOOK_MONITOR_FAIL
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
    firebase
      .database()
      .ref("bookFollows")
      .orderByChild(currentUser.uid)
      .equalTo(true)
      .on("value", snapshot => {
        const promises = [];
        snapshot.forEach(child => {
          const promise = firebase
            .database()
            .ref("storedBooks/" + child.key)
            .once("value");
          promises.push(promise);
        });
        Promise.all(promises).then(snapshots => {
          const monitoredBooks = snapshots.map(snapshot => {
            return snapshot.val();
          });
          dispatch({
            type: BOOKS_FETCH_MONITORED_SUCCESS,
            payload: monitoredBooks
          });
        });
      });
  };
};

export const addMonitorBook = storedBookID => {
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;

  return dispatch => {
    dispatch({ type: BOOK_MONITOR_REQUEST });
    firebase
      .database()
      .ref("/bookFollows/" + storedBookID + "/" + userId)
      .set(true)
      .then(() => {
        NavigationService.navigate("MonitorBook");
        dispatch({ type: BOOK_MONITOR_SUCCESS });
      })
      .catch(err =>
        dispatch({ type: BOOK_MONITOR_FAIL, payload: err.message })
      );
  };
};
