import React from "react";
import styles from "./LandingPage.module.scss";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

function LandingPage(props) {
  if (props.auth.uid) {
    return <Redirect to="/pantry" />;
  }
  return (
    <div className={styles.LandingPageContainer}>
      <h1>Welcome to MealPlanner</h1>
      <div className={styles.BtnContainer}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
      <div className={styles.Help}>
        <h3>How to Use:</h3>
        <p>
          1: Add any ingredients you use to the pantry, including how much they
          cost. Tick whether you ave in stock or not
        </p>
        <p>
          2: Add recipes you like to the recipes section. The recipe will then
          show you approximately how much the meal will cost.
        </p>
        <p>
          3: Make a meal plan for the week based on the recipes you have added.
          Then generate a shopping list for the week!
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(LandingPage);
