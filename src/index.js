//Modules
import React from "react";
import ReactDOM from "react-dom";
import HttpsRedirect from "react-https-redirect";
//Components
import AppRouter from "./Routes/AppRouter";
//Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers/rootReducer";
import thunk from "redux-thunk";
//Firebase
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import fbConfig from "./config/fbConfig";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    compose(
      applyMiddleware(
        thunk.withExtraArgument({
          getFirebase,
          getFirestore
        })
      ),
      reduxFirestore(fbConfig),
      reactReduxFirebase(fbConfig, {
        attachAuthIsReady: true,
        useFirestoreForProfile: true,
        userProfile: "users"
      })
    )
  )
);

//Wait for auth data before render
store.firebaseAuthIsReady.then(() => {
  const app = (
    <Provider store={store}>
      <HttpsRedirect>
        <AppRouter />
      </HttpsRedirect>
    </Provider>
  );
  ReactDOM.render(app, document.getElementById("root"));
});
