//Modules
import React from "react";
//Sass
import styles from "./RecipesFilter.module.scss";
//Redux
import { connect } from "react-redux";
import { changeFilter } from "../../../store/actions/recipesActions";

const RecipesFilter = props => {
  const handleFilterRecipes = e => {
    props.changeFilter(e.target.value);
  };

  return (
    <div className={styles.RecipeFilterContainer}>
      <label>
        Search by name:
        <input
          type="text"
          className={styles.FilterInput}
          onChange={handleFilterRecipes}
        />
      </label>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    changeFilter: filter => {
      dispatch(changeFilter(filter));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RecipesFilter);
