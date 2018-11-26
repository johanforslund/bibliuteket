import { combineReducers } from 'redux';
import BookReducer from './BookReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  books: BookReducer,
  auth: AuthReducer
});
