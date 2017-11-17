import firebase from 'firebase';
import {
  BOOKS_FETCH_SUCCESS
} from './types';

export const booksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/books')
      .on('value', snapshot => {
        dispatch({ type: BOOKS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
