//Modules
import React from "react";
//CSS
import styles from "./Planner.module.scss";
//Components
import WeekDisplay from "./WeekDisplay/WeekDisplay";
import AddNewWeek from "./AddNewWeek/AddNewWeek";

export default function Planner(props) {
  let mostRecentPlan = <p>Loading</p>;
  if (props.plans) {
    mostRecentPlan = <WeekDisplay plan={props.plans[0]} />;
  }
  return (
    <div>
      <AddNewWeek />
      {mostRecentPlan}
    </div>
  );
}
