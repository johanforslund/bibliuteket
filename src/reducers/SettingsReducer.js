import {
  SETTINGS_CHANGE_PHONE,
  SETTINGS_CHANGE_MESSENGER_NAME
} from "../actions/types";

const INITIAL_STATE = {
  phone: "",
  messengerName: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_CHANGE_PHONE:
      return { ...state, phone: action.payload };
    case SETTINGS_CHANGE_MESSENGER_NAME:
      return { ...state, messengerName: action.payload };
    default:
      return state;
  }
};
