import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCHC8lWnUHvsRGbIGL3gSK7JIRFrmjGofU",
  authDomain: "meal-planner-v2-d5241.firebaseapp.com",
  databaseURL: "https://meal-planner-v2-d5241.firebaseio.com",
  projectId: "meal-planner-v2-d5241",
  storageBucket: "meal-planner-v2-d5241.appspot.com",
  messagingSenderId: "1056150131694"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
