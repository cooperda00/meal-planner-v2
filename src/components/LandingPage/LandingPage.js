//Modules
import React from "react";
import { Redirect, Link } from "react-router-dom";
//Sass
import styles from "./LandingPage.module.scss";
//Redux
import { connect } from "react-redux";

const LandingPage = props => {
  if (props.auth.uid) {
    return <Redirect to="/pantry" />;
  }
  return (
    <div className={styles.LandingPageContainer}>
      <h1>Welcome to Meal Planner</h1>
      <div className={styles.BtnContainer}>
        <Link to="/login">
          <button className={styles.LandingBtn}>Login</button>
        </Link>
        <Link to="/signup">
          <button className={styles.LandingBtn}>Signup</button>
        </Link>
      </div>
      <p style={{ marginTop: "1rem" }}>
        *Please use <strong>Email:</strong> demo@demo.com{" "}
        <strong>Password:</strong> demo1234 to preview the site.
      </p>
      <div className={styles.Help}>
        <h3>How to Use:</h3>
        <p>
          1: Add any ingredients you use to the <strong>Pantry</strong>,
          including how much they cost. Tick whether you have in stock or not.
        </p>
        <p>
          2: Add your favorite recipes to the <strong>Recipes</strong> section.
          The recipe will then show you approximately how much the meal will
          cost.
        </p>
        <p>
          3: Use the <strong>Planner</strong> to make a meal plan for the week
          based on the recipes you have added. Then generate a shopping list for
          the week!
        </p>
        <br />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LandingPage);
