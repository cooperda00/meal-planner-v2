import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Recipes from "./Recipes";
import { Redirect } from "react-router-dom";
import {
  changeTagFilter,
  changeFilter
} from "../../store/actions/recipesActions";

class RecipesContainer extends Component {
  state = {
    tags: [],
    recipes: []
  };

  componentDidMount() {
    //Timeout to allow for database response
    setTimeout(() => {
      //Checks for user specific data and grabs tags
      const arr = this.props.recipes
        .map(recipe => this.props.uid === recipe.userId && recipe.tags)
        //Flatten array
        .flat();
      //Convert to set to remove dupes
      const set = new Set(arr);
      const tags = Array.from(set);
      this.setState({
        tags
      });
    }, 2500);
    //Reset Tag Filters
    this.props.changeTagFilter("All");
  }

  //Reset filters on unmount
  componentWillUnmount() {
    this.props.changeFilter("");
  }

  render() {
    if (!this.props.uid) {
      return <Redirect to="/" />;
    }
    return <Recipes recipes={this.props.recipes} tags={this.state.tags} />;
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    recipes: state.firestore.ordered.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTagFilter: tagFilter => {
      dispatch(changeTagFilter(tagFilter));
    },
    changeFilter: filter => {
      dispatch(changeFilter(filter));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "recipes"
      }
    ];
  })
)(RecipesContainer);
