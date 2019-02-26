//Modules
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Components
import PantryContainer from "../components/Pantry/PantryContainer";
import Header from "../components/Header/Header";
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
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
