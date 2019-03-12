// Modules
import React from "react";
//CSS
import styles from "./PantryAddBtn.module.scss";

export default function PantryAddBtn(props) {
  return (
    <div className={styles.Container} tabIndex="0">
      <div className={styles.Add} onClick={props.handleAddIngredient}>
        <div className={styles.CrossContainer}>
          <div className={styles.Horizontal} />
          <div className={styles.Vertical} />
        </div>
      </div>
    </div>
  );
}
