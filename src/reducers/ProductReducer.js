import {SET_BARCODE, SET_PRODUCT_IMAGE} from '../constants/types';

const INIT_STATE = {
  barcode: null,
  imageFile: null,
};

export const ProductReducer = (state = INIT_STATE, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_BARCODE:
      return {
        ...state,
        barcode: payload,
      };

    case SET_PRODUCT_IMAGE:
      return {
        ...state,
        imageFile: payload,
      };
    default:
      return state;
  }
};
