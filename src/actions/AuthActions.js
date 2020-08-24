import firebase from "react-native-firebase";
import Toast from "react-native-root-toast";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_PASSWORD_REQUEST,
  UPDATE_USER_PASSWORD_SUCCESS,
  UPDATE_USER_PASSWORD_FAIL
} from "./types";

export const loginUser = ({ liuId, password }) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER_REQUEST });
    const email = `${liuId}@student.liu.se`;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => loginUserSuccess(dispatch))
      .catch(error => loginUserFail(error.message, dispatch));
  };
};

export const registerUser = ({ name, liuId, password }) => {
  return dispatch => {
    dispatch({ type: REGISTER_USER_REQUEST });
    const email = `${liuId}@student.liu.se`;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userInfo => {
        userInfo.user
          .updateProfile({
            displayName: name
          })
          .then(() => {
            userInfo.user
              .sendEmailVerification()
              .then(() => console.log("Sent email confirmation"))
              .catch(error => console.log(error));
          })
          .then(() => {
            registerUserSuccess(dispatch);
          });
      })
      .catch(error => registerUserFail(error.message, dispatch));
  };
};

export const updateUserDetails = name => {
  return dispatch => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name
      })
      .then(() => {
        updateUserDetailsSuccess(dispatch);
      })
      .catch(error => updateUserDetailsFail(error.message, dispatch));
  };
};

export const updateUserPassword = newPassword => {
  return dispatch => {
    dispatch({ type: UPDATE_USER_PASSWORD_REQUEST });
    return firebase
      .auth()
      .currentUser.updatePassword(newPassword)
      .then(() => {
        updateUserPasswordSuccess(dispatch);
      })
      .catch(error => {
        updateUserPasswordFail(error.message, dispatch);
      });
  };
};

export const deleteUser = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    dispatch({ type: DELETE_USER_REQUEST });
    firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .remove()
      .then(() => {
        firebase
          .auth()
          .currentUser.delete()
          .then(() => {
            deleteUserSuccess(dispatch);
            Toast.show("Ditt konto har tagits bort");
          });
      })
      .catch(error => deleteUserFail(error.message, dispatch));
  };
};

const loginUserFail = (error, dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const loginUserSuccess = dispatch => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
};

const registerUserFail = (error, dispatch) => {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: error
  });
};

const registerUserSuccess = dispatch => {
  dispatch({
    type: REGISTER_USER_SUCCESS
  });
};

const updateUserDetailsFail = (error, dispatch) => {
  dispatch({
    type: UPDATE_USER_DETAILS_FAIL,
    payload: error
  });
};

const updateUserDetailsSuccess = dispatch => {
  dispatch({
    type: UPDATE_USER_DETAILS_SUCCESS
  });
};

const updateUserPasswordSuccess = dispatch => {
  dispatch({
    type: UPDATE_USER_PASSWORD_SUCCESS
  });
};

const updateUserPasswordFail = (error, dispatch) => {
  dispatch({
    type: UPDATE_USER_PASSWORD_FAIL,
    payload: error
  });
};

const deleteUserFail = (error, dispatch) => {
  dispatch({
    type: DELETE_USER_FAIL,
    payload: error
  });
};

const deleteUserSuccess = dispatch => {
  dispatch({
    type: DELETE_USER_SUCCESS
  });
};
