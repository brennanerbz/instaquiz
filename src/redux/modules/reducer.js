import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import overlays from './overlays';
import quiz from './quiz';
// Keep in alphabetical order
export default combineReducers({
  router: routerStateReducer,
  overlays,
  quiz
});
