import { FETCH_USER, FETCH_MYPROFILE, ERROR_RESPONSE } from '../actions/types';

const INITIAL_STATE = { profile: {}, message: '', error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, profile: action.payload.user };
    case FETCH_MYPROFILE:
      return { ...state, profile: action.payload.user };
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}
