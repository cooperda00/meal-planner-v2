//Modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
//Styles
import styles from "./Login.module.scss";
//Redux
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authActions";
//Components
import Spinner from "../../Spinner/Spinner";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    const { authError, auth } = this.props;
    //Route Blocker
    if (auth.uid) {
      return <Redirect to="/pantry" />;
    }

    if (this.props.isFetching) {
      return <Spinner marginTop="5rem" />;
    } else {
      return (
        <div className={styles.LoginContainer}>
          <h1>Login: </h1>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.FormContainer}>
              <label htmlFor="email">
                Email:
                <input id="email" type="email" onChange={this.handleChange} />
              </label>
            </div>

            <div className={styles.FormContainer}>
              <label htmlFor="password">
                Password:
                <input
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </label>
            </div>

            {authError && <p>{authError}</p>}

            <button className={styles.LoginBtn}>Submit</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    isFetching: state.auth.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => {
      dispatch(signIn(creds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
