//Modules
import React, { Component } from "react";
//CSS
import styles from "./DayDisplay.module.scss";
//Components
import AddMeal from "./AddMeal/AddMeal";
import AddMealBtn from "./AddMealBtn/AddMealBtn";
import Date from "./Date/Date";
import Meal from "./Meal/Meal";
import RemoveBtn from "./RemoveBtn/RemoveBtn";

export default class DayDisplay extends Component {
  render() {
    return (
      <div className={styles.DayDisplay}>
        <div className={styles.TopLine}>
          <Date />
          {/* <AddMeal /> */}
          <AddMealBtn />
        </div>
        <div className={styles.BottomLine}>
          <Meal />
          <RemoveBtn />
        </div>
      </div>
    );
  }
}
