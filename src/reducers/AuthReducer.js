import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
  UPDATE_USER_DETAILS_REQUEST
} from "../actions/types";

const INITIAL_STATE = {
  loginError: "",
  registerError: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loginError: "", registerError: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case LOGIN_USER_FAIL:
      return { ...state, loginError: action.payload };
    case REGISTER_USER_REQUEST:
      return { ...state, loginError: "", registerError: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case REGISTER_USER_FAIL:
      return { ...state, registerError: action.payload };
    case UPDATE_USER_DETAILS_REQUEST:
      return { ...state, loginError: "", registerError: "" };
    case UPDATE_USER_DETAILS_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case UPDATE_USER_DETAILS_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
