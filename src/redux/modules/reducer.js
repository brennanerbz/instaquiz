import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import quiz from './quiz';
// Keep in alphabetical order
export default combineReducers({
  router: routerStateReducer,
  quiz
});
