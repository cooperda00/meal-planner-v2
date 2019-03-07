//Modules
import React, { Component } from "react";
//CSS
import styles from "./WeekDisplay.module.scss";
//Components
import DayDisplay from "./DayDisplay/DayDisplay";

export default class WeekDisplay extends Component {
  render() {
    return (
      <div className={styles.WeekDisplay}>
        <DayDisplay />
      </div>
    );
  }
}
