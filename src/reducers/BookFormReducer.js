import {
  BOOK_UPDATE,
  BOOK_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  author: '',
  date: '',
  description: '',
  email: '',
  location: 'Norrköping',
  name: '',
  phone: '',
  pictureUrl: null,
  price: '',
  title: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BOOK_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case BOOK_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
