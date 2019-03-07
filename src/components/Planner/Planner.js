//Modules
import React from "react";
//CSS
import styles from "./Planner.module.scss";
//Components
import Calendar from "./Calendar/Calendar";
import WeekDisplay from "./WeekDisplay/WeekDisplay";

export default function Planner() {
  return (
    <div>
      <Calendar />
      <WeekDisplay />
    </div>
  );
}
