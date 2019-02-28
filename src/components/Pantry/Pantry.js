//Modules
import React from "react";
import { Redirect } from "react-router-dom";
//CSS
import styles from "./Pantry.module.scss";
//Components
import PantryItem from "./PantryItem/PantryItem";
import Spinner from "../Spinner/Spinner";
import PantryAddBtn from "./PantryAddBtn/PantryAddBtn";
//Redux
import { connect } from "react-redux";

const Pantry = props => {
  const {
    handleAddIngredient,
    handleDeleteIngredient,
    handleEditIngredient,
    handleEditIngredientCheckbox
  } = props;
  const ingredients = props.ingredients;

  if (!props.auth.uid) {
    return <Redirect to="/" />;
  }

  const pantryContainer = () => {
    return ingredients ? (
      <div className={styles.PantryItemContainer}>
        {ingredients
          .sort((a, b) => a.timeStamp - b.timeStamp)
          .map(ing => {
            return (
              <PantryItem
                key={ing.id}
                ing={ing}
                editIngredient={handleEditIngredient}
                deleteIngredient={handleDeleteIngredient}
                editIngredientCheckbox={handleEditIngredientCheckbox}
              />
            );
          })}
      </div>
    ) : (
      <Spinner />
    );
  };
  return (
    <div className={styles.PantryViewContainer}>
      <div className={styles.TitleAndBtnContainer}>
        <h1 className={styles.PantryTitle}>Pantry</h1>
      </div>
      {pantryContainer()}
      <PantryAddBtn handleAddIngredient={handleAddIngredient} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Pantry);
