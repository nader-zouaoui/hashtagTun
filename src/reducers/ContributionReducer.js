import {
  FETCH_ALL_CONTRIBUTIONS_FAILURE,
  FETCH_ALL_CONTRIBUTIONS_STARTED,
  FETCH_ALL_CONTRIBUTIONS_SUCCESS,
  CREATE_CONTRIBUTION_FAILURE,
  CREATE_CONTRIBUTION_STARTED,
  CREATE_CONTRIBUTION_SUCCESS,
  FETCH_CONTRIBUTIONS_BY_BARCODE_FAILURE,
  FETCH_CONTRIBUTIONS_BY_BARCODE_STARTED,
  FETCH_CONTRIBUTIONS_BY_BARCODE_SUCCESS,
  FETCH_CONTRIBUTIONS_BY_USER_FAILURE,
  FETCH_CONTRIBUTIONS_BY_USER_STARTED,
  FETCH_CONTRIBUTIONS_BY_USER_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_STARTED,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_PROGRESS_REPORT,
  FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_FAILURE,
  FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_STARTED,
  FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_SUCCESS,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_FAILURE,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_STARTED,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_SUCCESS,
  FETCH_CONTRIBUTIONS_NEXT_PAGE_FAILURE,
  FETCH_CONTRIBUTIONS_NEXT_PAGE_STARTED,
  FETCH_CONTRIBUTIONS_NEXT_PAGE_SUCCESS,
} from '../constants/types';

const INIT_STATE = {
  error: null,
  loading: false,
  allContributions: [],
  contributionsByProductBarcode: [],
  contributionsByUser: [],
  uploadProgress: 0,
  isImageUploading: false,
};

export const ContributionReducer = (state = INIT_STATE, action) => {
  const {type, payload, error} = action;

  switch (type) {
    case FETCH_ALL_CONTRIBUTIONS_STARTED:
    case FETCH_CONTRIBUTIONS_BY_BARCODE_STARTED:
    case FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_STARTED:
    case FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_STARTED:
    case FETCH_CONTRIBUTIONS_NEXT_PAGE_STARTED:
    case FETCH_CONTRIBUTIONS_BY_USER_STARTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CONTRIBUTIONS_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        allContributions: [...state.allContributions, ...payload],
      };

    case FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        contributionsByUser: [...state.contributionsByUser, ...payload],
      };
    case FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        contributionsByProductBarcode: [
          ...state.contributionsByProductBarcode,
          ...payload,
        ],
      };

    case CREATE_CONTRIBUTION_STARTED:
      return {
        ...state,
        loading: true,
        uploadProgress: 0,
      };

    case IMAGE_UPLOAD_STARTED:
      return {
        ...state,
        isImageUploading: true,
      };

    case IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        isImageUploading: false,
        uploadProgress: 0,
        error,
      };

    case IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isImageUploading: false,
      };

    case IMAGE_UPLOAD_PROGRESS_REPORT:
      return {
        ...state,
        uploadProgress: payload,
      };

    case FETCH_ALL_CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        allContributions: payload,
        loading: false,
      };

    case FETCH_CONTRIBUTIONS_BY_BARCODE_SUCCESS:
      return {
        ...state,
        contributionsByProductBarcode: payload,
        loading: false,
      };
    case FETCH_CONTRIBUTIONS_BY_USER_SUCCESS:
      return {
        ...state,
        contributionsByUser: payload,
        loading: false,
      };

    case CREATE_CONTRIBUTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case FETCH_ALL_CONTRIBUTIONS_FAILURE:
    case FETCH_CONTRIBUTIONS_BY_BARCODE_FAILURE:
    case CREATE_CONTRIBUTION_FAILURE:
    case FETCH_CONTRIBUTIONS_BY_USER_FAILURE:
    case FETCH_CONTRIBUTIONS_BY_BARCODE_NEXT_PAGE_FAILURE:
    case FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_FAILURE:
    case FETCH_CONTRIBUTIONS_NEXT_PAGE_FAILURE:
      return {
        ...state,
        error,
        loading: false,
      };
    default:
      return state;
  }
};
