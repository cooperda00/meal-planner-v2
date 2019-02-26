//Modules
import React from "react";
//CSS
import styles from "./Pantry.module.scss";
//Components
import PantryItem from "./PantryItem/PantryItem";
import Spinner from "../Spinner/Spinner";
import PantryAddBtn from "./PantryAddBtn/PantryAddBtn";

const Pantry = props => {
  const {
    handleAddIngredient,
    handleDeleteIngredient,
    handleEditIngredient
  } = props;
  const ingredients = props.data.ingredients;

  const pantryContainer = () => {
    return ingredients.length > 0 ? (
      <div className={styles.PantryItemContainer}>
        {ingredients.map(ing => {
          return (
            <PantryItem
              key={ing.id}
              ing={ing}
              editIngredient={handleEditIngredient}
              deleteIngredient={handleDeleteIngredient}
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

export default Pantry;
