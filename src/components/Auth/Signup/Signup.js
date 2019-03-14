import React, { Component } from "react";
import styles from "./Signup.module.scss";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/actions/authActions";
import Spinner from "../../Spinner/Spinner";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    initials: "",
    passwordCheck: "",
    error: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password === this.state.passwordCheck) {
      this.props.signUp({
        email: this.state.email,
        password: this.state.password,
        initials: this.state.initials
      });
    } else {
      this.setState({
        error: "Please make sure you have typed your password correctly"
      });
    }
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/pantry" />;

    if (this.props.isFetching) {
      return <Spinner />;
    } else {
      return (
        <div className={styles.SignupContainer}>
          <h1>Signup: </h1>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.FormContainer}>
              <label htmlFor="email">
                Email:
                <input
                  id="email"
                  type="email"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>

            <div className={styles.FormContainer}>
              <label htmlFor="password">
                Password:
                <input
                  id="password"
                  type="password"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>

            <div className={styles.FormContainer}>
              <label htmlFor="passwordCheck">
                Password:
                <input
                  id="passwordCheck"
                  type="password"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>

            <div className={styles.FormContainer}>
              <label htmlFor="initials">
                Initials:
                <input
                  id="initials"
                  type="text"
                  onChange={this.handleChange}
                  required
                />
              </label>
            </div>

            <button>Submit</button>
          </form>
          {authError && <p className={styles.Error}>{authError}</p>}

          {this.state.error && (
            <p className={styles.Error}>{this.state.error}</p>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    isFetching: state.auth.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => {
      dispatch(signUp(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
