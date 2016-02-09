import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

// Keep in alphabetical order
export default combineReducers({
  router: routerStateReducer
});
