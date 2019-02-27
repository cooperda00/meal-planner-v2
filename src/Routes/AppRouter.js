//Modules
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Components
import PantryContainer from "../components/Pantry/PantryContainer";
import Header from "../components/Header/Header";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
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
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
