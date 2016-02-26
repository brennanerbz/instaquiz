import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import overlays from './overlays';
import user from './user';
import quiz from './quiz';
// Keep in alphabetical order
export default combineReducers({
  router: routerStateReducer,
  overlays,
  user,
  quiz
});
