//Modules
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//Components
import PantryContainer from "../components/Pantry/PantryContainer";
import Header from "../components/Header/Header";
import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import LandingPage from "../components/LandingPage/LandingPage";
import RecipesContainer from "../components/Recipes/RecipesContainer";
import AddRecipe from "../components/Recipes/AddRecipe/AddRecipe";
import IndividualRecipeContainer from "../components/Recipes/IndividualRecipe/IndividualRecipeContainer";
import EditRecipe from "../components/Recipes/EditRecipe/EditRecipe";
import PlannerContainer from "../components/Planner/PlannerContainer";
import Page404 from "../components/Page404/Page404";
//CSS
import styles from "./AppRouter.module.scss";
import "../base.css";

const AppRouter = () => (
  <BrowserRouter>
    <div className={styles.Container}>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact={true} />
        <Route path="/pantry" component={PantryContainer} />
        <Route path="/recipes" component={RecipesContainer} exact={true} />
        <Route path="/recipes/add" component={AddRecipe} exact={true} />
        <Route
          path="/recipes/:id"
          component={IndividualRecipeContainer}
          exact={true}
        />
        <Route path="/recipes/edit/:id" component={EditRecipe} exact={true} />
        <Route path="/planner" component={PlannerContainer} exact={true} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={Page404} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
