import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import initialize from './initialize';

const rootReducer = combineReducers({
  initialize,
  router
});

export default rootReducer;
