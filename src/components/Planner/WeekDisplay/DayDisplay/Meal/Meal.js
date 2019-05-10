//Modules
import React from "react";
import { Link } from "react-router-dom";
//CSS
import styles from "./Meal.module.scss";
//Components
import RemoveBtn from "../RemoveBtn/RemoveBtn";

export default function Meal(props) {
  const { name, type, id } = props.meal;

  const getStyle = () => {
    switch (type) {
      case "Breakfast":
        return styles.Breakfast;
      case "Lunch":
        return styles.Lunch;
      case "Dinner":
        return styles.Dinner;
      case "Snack":
        return styles.Snack;
      default:
        return "";
    }
  };
  return (
    <div className={styles.Meal}>
      <div className={styles.MealName}>
        <p className={getStyle()}>{type}</p>
      </div>
      <div className={styles.MealRecipe}>
        <Link to={`/recipes/${id}`}>
          <p>{name}</p>
        </Link>
      </div>
      <RemoveBtn
        week={props.week}
        day={props.day}
        weekId={props.weekId}
        name={name}
        type={type}
        className={styles.MealItem}
      />
    </div>
  );
}
