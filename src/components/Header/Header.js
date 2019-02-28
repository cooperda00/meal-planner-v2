import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./Header.module.scss";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

function Header(props) {
  const { auth } = props;

  const handleLogout = () => {
    props.signOut();
    props.history.push("/");
  };

  const loggedOutLinks = (
    <>
      <NavLink activeClassName="is-active" to="/login">
        Login
      </NavLink>
      <NavLink activeClassName="is-active" to="/signup">
        Signup
      </NavLink>
    </>
  );

  const loggedInLinks = (
    <>
      <p className={styles.Logout} onClick={handleLogout}>
        Logout
      </p>
      <NavLink activeClassName="is-active" to="/pantry">
        Pantry
      </NavLink>
      {/* <NavLink activeClassName="is-active" to="/planner">
        Planner
      </NavLink>
      <NavLink activeClassName="is-active" to="/recipes">
        Recipes
      </NavLink> */}
    </>
  );
  return (
    <div className={styles.Header}>
      <h1>Meal Planner</h1>
      <div className={styles.NavContainer}>
        {auth.uid ? loggedInLinks : loggedOutLinks}
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
