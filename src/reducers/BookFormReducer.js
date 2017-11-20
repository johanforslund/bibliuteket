import {
  BOOK_UPDATE,
  BOOK_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  author: 'Bengt Sandell',
  date: '',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  email: 'test@test.com',
  location: 'Norrköping',
  name: 'Test Testsson',
  phone: '0701234567',
  pictureUrl: null,
  price: '500',
  title: 'Exempelbok'
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
