//Modules
import React, { Component } from "react";
//CSS
import styles from "./WeekDisplay.module.scss";
//Components
import DayDisplay from "./DayDisplay/DayDisplay";

export default class WeekDisplay extends Component {
  render() {
    if (this.props.plan) {
      return (
        <div className={styles.WeekDisplay}>
          {this.props.plan.week.map(day => {
            return (
              <DayDisplay data={day} key={this.props.plan.userId + day.day} />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}
