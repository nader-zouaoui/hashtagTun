import {
  FETCH_CONTRIBUTIONS_BY_USER_FAILURE,
  FETCH_CONTRIBUTIONS_BY_USER_STARTED,
  FETCH_CONTRIBUTIONS_BY_USER_SUCCESS,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_FAILURE,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_STARTED,
  FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_SUCCESS,
} from '../constants/types';
import {ITEMS_PER_PAGE} from 'constants';

import firestore from '@react-native-firebase/firestore';

export const FetchContributionsByUserAction = () => async (
  dispatch,
  getState,
) => {
  try {
    const globalState = getState();

    const {
      user: {userId},
    } = globalState;

    dispatch(fetchContributionsStarted());
    const payload = [];
    const collection = await firestore()
      .collection('contributions')
      .limit(ITEMS_PER_PAGE)
      .where('userId', '==', userId)
      .orderBy('time', 'desc')
      .get();

    collection.docs.map(doc => {
      const docData = doc.data();
      const dataSnap = {
        id: doc.id,
        time: docData.time,
        userId: docData.userId,
        name: docData.name,
        productBarcode: docData.productBarcode,
        place: docData.place,
        price: docData.price,
        imageUrl: docData.imageUrl ? docData.imageUrl.url : undefined,
      };
      payload.push(dataSnap);
    });

    dispatch(fetchContributionsSuccess(payload));
  } catch (error) {
    dispatch(fetchContributionsFailure(error));
  }
};

export const FetchContributionsByUserNextPageAction = () => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(fetchNextPageStarted());
    const globalState = getState();
    const {
      contributions: {contributionsByUser},
      user: {userId},
    } = globalState;
    const lastContribution =
      contributionsByUser[contributionsByUser.length - 1];

    const payload = [];
    const collection = await firestore()
      .collection('contributions')
      .limit(ITEMS_PER_PAGE)
      .where('userId', '==', userId)
      .orderBy('time', 'desc')
      .startAfter(lastContribution.time)
      .get();

    collection.docs.map(doc => {
      const docData = doc.data();
      const dataSnap = {
        id: doc.id,
        time: docData.time,
        userId: docData.userId,
        name: docData.name,
        productBarcode: docData.productBarcode,
        place: docData.place,
        price: docData.price,
        imageUrl: docData.imageUrl ? docData.imageUrl.url : undefined,
      };
      payload.push(dataSnap);
    });

    // payload.sort(function(x, y) {
    //   return y.time - x.time;
    // });

    dispatch(fetchNextPageSuccess(payload));
  } catch (error) {
    dispatch(fetchNextPageFailure(error));
  }
};

const fetchNextPageStarted = () => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_STARTED,
});

const fetchNextPageSuccess = payload => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_SUCCESS,
  payload,
});

const fetchNextPageFailure = error => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_NEXT_PAGE_FAILURE,
  error,
});

const fetchContributionsStarted = () => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_STARTED,
});

const fetchContributionsSuccess = payload => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_SUCCESS,
  payload,
});

const fetchContributionsFailure = error => ({
  type: FETCH_CONTRIBUTIONS_BY_USER_FAILURE,
  error,
});
