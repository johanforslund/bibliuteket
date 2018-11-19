import firebase from '@firebase/app';
import '@firebase/database';
import {
  BOOKS_FETCH_SUCCESS
} from './types';

export const booksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('books').orderByChild('date')
      .on('value', snapshot => {
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
