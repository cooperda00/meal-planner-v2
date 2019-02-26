//Modules
import React from "react";
import ReactDOM from "react-dom";
//Components
import AppRouter from "./Routes/AppRouter";
//Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, composeWithDevTools());

const app = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
