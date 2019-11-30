import {SET_USER_ID_FINISHED, FETCH_USER_ID_FINISHED} from 'constants';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

export const onAppBootAction = () => async dispatch => {
  const userId = await AsyncStorage.getItem('userId');
  if (userId) dispatch(fetchUserIdFinished(userId));
  else {
    const newId = uuid.v4();
    await AsyncStorage.setItem('userId', newId);
    dispatch(setUserIdFinished(newId));
  }
};

const fetchUserIdFinished = payload => ({
  type: FETCH_USER_ID_FINISHED,
  payload,
});

const setUserIdFinished = payload => ({
  type: SET_USER_ID_FINISHED,
  payload,
});
