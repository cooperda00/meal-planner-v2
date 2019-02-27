//Modules
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Components
import PantryContainer from "../components/Pantry/PantryContainer";
import Header from "../components/Header/Header";
import Login from "../components/Auth/Login/Login";
//CSS
import styles from "./AppRouter.module.scss";
import "../base.css";

const AppRouter = () => (
  <BrowserRouter>
    <div className={styles.Container}>
      <Header />
      <Switch>
        <Route path="/" component={PantryContainer} exact={true} />
        <Route path="/pantry" component={PantryContainer} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
