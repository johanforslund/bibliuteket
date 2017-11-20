import firebase from 'firebase';
import {
  BOOKS_FETCH_SUCCESS,
  BOOK_UPDATE,
  BOOK_CREATE
} from './types';

export const booksFetch = () => {
  return (dispatch) => {
    firebase.database().ref('books').orderByChild('date')
      .on('value', snapshot => {
        const books = [];
        snapshot.forEach(child => {
          books.push(child.val());
        });
        books.reverse();
        dispatch({ type: BOOKS_FETCH_SUCCESS, payload: books });
      });
  };
};

export const bookUpdate = ({ prop, value }) => {
  return {
    type: BOOK_UPDATE,
    payload: { prop, value }
  };
};

export const bookCreate = ({
  author, date, description, email, location, phone, pictureUrl, price, name, title
}) => {
  return (dispatch) => {
    firebase.database().ref('/books')
      .push({ author, date, description, email, location, phone, pictureUrl, price, name, title })
      .then(() => {
        dispatch({ type: BOOK_CREATE });
      });
  };
};
