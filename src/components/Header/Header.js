import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <div className={styles.Header}>
      <h1>Meal Planner</h1>
      <div className={styles.NavContainer}>
        <NavLink activeClassName="is-active" to="/planner">
          Planner
        </NavLink>
        <NavLink activeClassName="is-active" to="/recipes">
          Recipes
        </NavLink>
        <NavLink activeClassName="is-active" to="/pantry">
          Pantry
        </NavLink>
      </div>
    </div>
  );
}
