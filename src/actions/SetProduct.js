import {SET_BARCODE, SET_PRODUCT_IMAGE} from '../constants';

export const SetProductBarcode = productBarcode => (dispatch, getState) => {
  dispatch({type: SET_BARCODE, payload: productBarcode});
};

export const SetProductImageFile = imageFile => (dispatch, getState) => {
  dispatch({type: SET_PRODUCT_IMAGE, payload: imageFile});
};
