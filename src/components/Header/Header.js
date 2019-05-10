//Modules
import React from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
//Sass
import styles from "./Header.module.scss";
//Components
import UserLogo from "./UserLogo/UserLogo";

function Header(props) {
  const { auth } = props;

  const handleLogout = () => {
    props.signOut();
    props.history.push("/");
  };

  const handleLogoutKey = e => {
    if (e.which === 13) {
      props.signOut();
      props.history.push("/");
    }
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
      <a
        className={styles.Logout}
        onClick={handleLogout}
        onKeyPress={handleLogoutKey}
        tabIndex="0"
      >
        Logout
      </a>
      <NavLink activeClassName="is-active" to="/pantry">
        Pantry
      </NavLink>
      <NavLink activeClassName="is-active" to="/recipes">
        Recipes
      </NavLink>
      <NavLink activeClassName="is-active" to="/planner">
        Planner
      </NavLink>
    </>
  );
  return (
    <div className={styles.Header}>
      <Link to={"/"}>
        <h1>Meal Planner</h1>
      </Link>
      <div className={styles.NavContainer}>
        {auth.uid ? loggedInLinks : loggedOutLinks}
      </div>
      {auth.uid && <UserLogo />}
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
