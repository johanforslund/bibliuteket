import { combineReducers } from "redux";
import BookReducer from "./BookReducer";
import AuthReducer from "./AuthReducer";
import ProfileReducer from "./ProfileReducer";
import LoadingReducer from "./LoadingReducer";

export default combineReducers({
  books: BookReducer,
  auth: AuthReducer,
  profile: ProfileReducer,
  loading: LoadingReducer
});
