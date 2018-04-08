// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import initialize from './initialize';

const rootReducer = combineReducers({
  counter,
  router,
  initialize
});

export default rootReducer;
