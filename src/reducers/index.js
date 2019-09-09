import { combineReducers } from "redux";
import BookReducer from "./BookReducer";
import AuthReducer from "./AuthReducer";
import ProfileReducer from "./ProfileReducer";

export default combineReducers({
  books: BookReducer,
  auth: AuthReducer,
  profile: ProfileReducer
});
