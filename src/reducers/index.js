import { combineReducers } from 'redux';
import BookReducer from './BookReducer';
import BookFormReducer from './BookFormReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  books: BookReducer,
  bookForm: BookFormReducer,
  auth: AuthReducer
});
