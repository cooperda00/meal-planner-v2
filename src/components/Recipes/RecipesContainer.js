import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Recipes from "./Recipes";
import { Redirect } from "react-router-dom";

class RecipesContainer extends Component {
  render() {
    if (!this.props.uid) {
      return <Redirect to="/" />;
    }
    return <Recipes recipes={this.props.recipes} />;
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    recipes: state.firestore.ordered.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "recipes" }])
)(RecipesContainer);
