//Modules
import React from "react";
import { Redirect } from "react-router-dom";
//CSS
import styles from "./Pantry.module.scss";
//Components
import PantryItem from "./PantryItem/PantryItem";
import Spinner from "../Spinner/Spinner";
import PantryForm from "./PantryForm/PantryForm";
//Redux
import { connect } from "react-redux";

const Pantry = props => {
  console.log(props.ingredients);
  const {
    handleDeleteIngredient,
    handleEditIngredient,
    handleEditIngredientCheckbox
  } = props;

  //Set ingredients when loaded
  let ingredients = [];
  if (props.ingredients) {
    ingredients = [...props.ingredients];
  }

  //Route Guard
  if (!props.auth.uid) {
    return <Redirect to="/" />;
  }

  const pantryContainer = () => {
    return ingredients ? (
      <div className={styles.PantryItemContainer}>
        <div className={styles.PantryTitles}>
          <h3 className={styles.Item}>Food Item</h3>
          <h3 className={styles.Price}>Price</h3>
          <h3 className={styles.Unit}>Unit</h3>
          <h3 className={styles.Stock}>In Stock</h3>
        </div>
        <PantryForm />
        {ingredients
          .sort((a, b) => {
            return a.name.localeCompare(b.name);
          })
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
      <div className={styles.TitleContainer}>
        <h1>Pantry</h1>
        <p>
          Add pantry items here. This information will be used by{" "}
          <strong>Recipes</strong> and <strong>Planner</strong>.
        </p>
      </div>
      {pantryContainer()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Pantry);
