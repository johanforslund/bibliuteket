import { combineReducers } from 'redux';
import BookReducer from './BookReducer';
import BookFormReducer from './BookFormReducer';

export default combineReducers({
  books: BookReducer,
  bookForm: BookFormReducer
});
