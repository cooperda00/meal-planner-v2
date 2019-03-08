//Modules
import React from "react";
//CSS
import styles from "./Meal.module.scss";
//Components
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Meal(props) {
  const { name, type } = props.meal;
  return (
    <div className={styles.Meal}>
      <div className={styles.MealItem}>
        <p>{type}</p>
      </div>
      <div className={styles.MealItem}>
        <p>{name}</p>
      </div>
      <RemoveBtn />
    </div>
  );
}
