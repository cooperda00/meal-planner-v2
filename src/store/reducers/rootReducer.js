//Modules
import { combineReducers } from "redux";
//Reducers
import pantryReducer from "./pantryReducer";

const rootReducer = combineReducers({
  pantry: pantryReducer
});

export default rootReducer;
