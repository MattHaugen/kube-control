// @flow
import { INITIALIZE_READINESS_ADD, INITIALIZE_ERROR_ADD } from '../actions/initialize';

const initialState = {
   readinessPercent: 0,
   errors: []
};

const initialize = (state = initialState, action) => {
   switch (action.type) {
      case INITIALIZE_READINESS_ADD: {
         const newState = Object.assign({}, state);
         newState.readinessPercent += action.percent;
         return newState;
      }
      case INITIALIZE_ERROR_ADD: {
         const newState = Object.assign({}, state);
         newState.errors = [...newState.errors, ...[action.error]];
         return newState;
      }
      default:
      return state;
   }
};

export default initialize;
