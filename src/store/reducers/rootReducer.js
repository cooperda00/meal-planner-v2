//Modules
import { combineReducers } from "redux";
//Reducers
import pantryReducer from "./pantryReducer";
import authReducer from "./authReducer";
//Firebase
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  pantry: pantryReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
