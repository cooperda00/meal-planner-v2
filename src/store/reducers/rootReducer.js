//Modules
import { combineReducers } from "redux";
//Reducers
import pantryReducer from "./pantryReducer";
//Firebase
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  pantry: pantryReducer,
  firestore: firestoreReducer
});

export default rootReducer;
