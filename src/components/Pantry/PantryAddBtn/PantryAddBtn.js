// Modules
import React from "react";
//CSS
import styles from "./PantryAddBtn.module.scss";

export default function PantryAddBtn(props) {
  const handleAddIngredientReturn = e => {
    if (e.key === "Enter") {
      props.handleAddIngredient();
    }
  };
  return (
    <div
      className={styles.Container}
      tabIndex="0"
      onKeyPress={handleAddIngredientReturn}
    >
      <div className={styles.Add} onClick={props.handleAddIngredient}>
        <div className={styles.CrossContainer}>
          <div className={styles.Horizontal} />
          <div className={styles.Vertical} />
        </div>
      </div>
    </div>
  );
}
