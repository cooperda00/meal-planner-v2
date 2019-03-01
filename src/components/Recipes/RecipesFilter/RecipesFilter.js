import React from "react";
import styles from "./RecipesFilter.module.scss";
import { connect } from "react-redux";
import { changeFilter } from "../../../store/actions/recipesActions";

function RecipesFilter(props) {
  const handleFilterRecipes = e => {
    props.changeFilter(e.target.value);
  };

  return (
    <div className={styles.RecipeFilterContainer}>
      <label>
        Filter:
        <input
          type="text"
          className={styles.FilterInput}
          onChange={handleFilterRecipes}
        />
      </label>
    </div>
  );
}

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
