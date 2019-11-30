import {combineReducers} from 'redux';
import {ContributionReducer as contributions} from './ContributionReducer';
import {ProductReducer as product} from './ProductReducer';
import {UserReducer as user} from './UserReducer';

export default combineReducers({
  contributions,
  product,
  user,
});
