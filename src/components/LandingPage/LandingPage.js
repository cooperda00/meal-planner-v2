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
      <h2>Currently featuring: Pantry</h2>
      <div className={styles.BtnContainer}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
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
