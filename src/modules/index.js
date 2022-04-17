import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import walletReducer from "./walletReducer";

const rootReducer = combineReducers({
  tokenReducer,
  walletReducer,
});

export default rootReducer;
