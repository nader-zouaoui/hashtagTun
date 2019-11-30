import {FETCH_USER_ID_FINISHED, SET_USER_ID_FINISHED} from '../constants/types';

const INIT_STATE = {
  userId: null,
};

export const UserReducer = (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER_ID_FINISHED:
    case FETCH_USER_ID_FINISHED:
      return {
        ...state,
        userId: payload,
      };

    default:
      return state;
  }
};
