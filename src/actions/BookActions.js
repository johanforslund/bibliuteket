import firebase from '@firebase/app';
import '@firebase/auth';
import {
  BOOKS_FETCH_SUCCESS
} from './types';

export const booksFetch = () => {
  return {
    type: BOOKS_FETCH_SUCCESS,
    payload: 'temp_payload'
  };
};
