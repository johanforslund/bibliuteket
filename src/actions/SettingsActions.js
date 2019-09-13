import { SETTINGS_CHANGE_PHONE, SETTINGS_CHANGE_MESSENGER_NAME } from "./types";

export const changePhone = phoneNumber => {
  return {
    type: SETTINGS_CHANGE_PHONE,
    payload: phoneNumber
  };
};

export const changeMessengerName = messengerName => {
  return {
    type: SETTINGS_CHANGE_MESSENGER_NAME,
    payload: messengerName
  };
};
