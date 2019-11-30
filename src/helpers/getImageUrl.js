import {FIREBASE_URL} from 'constants';

export default (baseUrl, height, width) => {
  let getHeight = '';
  let getWidth = '';
  if (height) {
    getHeight = `h-${height}`;
  }
  if (width) {
    getWidth = `w-${width}`;
  }
  const url = baseUrl.split(FIREBASE_URL)[1];
  return `https://ik.imagekit.io/eDonec/tr:${getHeight},${getWidth},c-at_max/${url}`;
};
