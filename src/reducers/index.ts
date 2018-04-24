import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import initialize from "./initialize";

const rootReducer = combineReducers({
   initialize,
   router: routerReducer
});

export default rootReducer;
