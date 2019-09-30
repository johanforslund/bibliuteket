import firebase from "react-native-firebase"; //eslint-disable-line
import { BOOKS_PROFILE_FETCH_SUCCESS } from "./types";

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
