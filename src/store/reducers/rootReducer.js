//Modules
import { combineReducers } from "redux";
//Reducers
import pantryReducer from "./pantryReducer";
import authReducer from "./authReducer";
import recipesReducer from "./recipesReducer";
//Firebase
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  pantry: pantryReducer,
  recipes: recipesReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
