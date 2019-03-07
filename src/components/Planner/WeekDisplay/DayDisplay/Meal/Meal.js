//Modules
import React from "react";
//CSS
import styles from "./Meal.module.scss";

export default function Meal() {
  return (
    <>
      <div className={styles.MealItem}>
        <p>Breakfast</p>
      </div>
      <div className={styles.MealItem}>
        <p>Oatmeal</p>
      </div>
    </>
  );
}
