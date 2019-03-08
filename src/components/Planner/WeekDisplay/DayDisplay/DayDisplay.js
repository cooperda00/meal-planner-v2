//Modules
import React, { Component } from "react";
import uuid4 from "uuid";
//CSS
import styles from "./DayDisplay.module.scss";
//Components
import AddMeal from "./AddMeal/AddMeal";
import AddMealBtn from "./AddMealBtn/AddMealBtn";
import Date from "./Date/Date";
import Meal from "./Meal/Meal";

export default class DayDisplay extends Component {
  getDay = num => {
    switch (num) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 7:
        return "Sunday";
      default:
        return null;
    }
  };

  render() {
    return (
      <div className={styles.DayDisplay}>
        <div className={styles.TopLine}>
          <Date day={this.getDay(this.props.data.day)} />
          {/* <AddMeal /> */}
          <AddMealBtn />
        </div>
        <div className={styles.BottomLine}>
          {this.props.data.meals.map(meal => {
            return <Meal meal={meal} key={uuid4()} />;
          })}
        </div>
      </div>
    );
  }
}
