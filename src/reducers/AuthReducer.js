import {
  USER_UPDATE,
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
  name: "",
  liuid: "",
  password: "",
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOGIN_USER_REQUEST:
      return { ...state, error: "" };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: "" };
    case REGISTER_USER_REQUEST:
      return { ...state, error: "" };
    case REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case REGISTER_USER_FAIL:
      return { ...state, error: action.payload, password: "" };
    case UPDATE_USER_DETAILS_REQUEST:
      return { ...state, error: "" };
    case UPDATE_USER_DETAILS_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case UPDATE_USER_DETAILS_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
