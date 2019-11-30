import {
  CREATE_CONTRIBUTION_FAILURE,
  CREATE_CONTRIBUTION_STARTED,
  CREATE_CONTRIBUTION_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_STARTED,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_PROGRESS_REPORT,
} from '../constants/types';

import {imageUploadService} from 'utils';
import {
  FetchContributionsByUserAction,
  FetchContributionsAction,
} from 'actions';

import firestore from '@react-native-firebase/firestore';

const handleProgress = dispatch => progress => {
  dispatch(imageUploadReport(progress));
};

const uploadImage = (file, progressReporter) => async dispatch => {
  try {
    const url = await imageUploadService(
      file,
      progressReporter(dispatch),
      'images',
    );
    dispatch(imageUploadSuccess());
    return url;
  } catch (error) {
    console.log('File upload error', error);
    dispatch(imageUploadFailure(error));
  }
};

export const CreateContributionAction = ({name, place, price}) => async (
  dispatch,
  getState,
) => {
  const globalState = getState();
  const {
    user: {userId},
    product: {barcode, imageFile},
  } = globalState;

  try {
    dispatch(createContributionStarted());
    dispatch(imageUploadStarted());
    const url = await uploadImage(imageFile, handleProgress)(dispatch);
    await firestore()
      .collection('contributions')
      .add({
        time: new Date().getTime(),
        name,
        userId,
        productBarcode: barcode,
        place,
        price,
        imageUrl: url,
      });
    dispatch(createContributionSuccess());
    FetchContributionsByUserAction()(dispatch, getState);
    FetchContributionsAction()(dispatch, getState);
  } catch (error) {
    dispatch(createContributionFailure(error));
  }
};

const createContributionStarted = () => ({
  type: CREATE_CONTRIBUTION_STARTED,
});

const createContributionSuccess = () => ({
  type: CREATE_CONTRIBUTION_SUCCESS,
});

const createContributionFailure = error => ({
  type: CREATE_CONTRIBUTION_FAILURE,
  error,
});

const imageUploadStarted = () => ({
  type: IMAGE_UPLOAD_STARTED,
});

const imageUploadSuccess = () => ({
  type: IMAGE_UPLOAD_SUCCESS,
});

const imageUploadFailure = error => ({
  type: IMAGE_UPLOAD_FAILURE,
  error,
});

const imageUploadReport = payload => ({
  type: IMAGE_UPLOAD_PROGRESS_REPORT,
  payload,
});
