//Modules
import React from "react";
import uuid4 from "uuid";
//CSS
import styles from "./Planner.module.scss";
//Components
import WeekDisplay from "./WeekDisplay/WeekDisplay";
import AddNewWeek from "./AddNewWeek/AddNewWeek";
import PlanSelector from "./PlanSelector/PlanSelector";
import DeleteWeek from "./DeleteWeek/DeleteWeek";

export default function Planner(props) {
  let selectedPlan = <p>Loading</p>;
  if (props.plans) {
    selectedPlan = props.plans.map(plan => {
      if (plan.id === props.selectedPlan) {
        return <WeekDisplay plan={plan} key={uuid4()} />;
      }
    });
  }
  return (
    <div className={styles.PlannerContainer}>
      <h1>Planner</h1>
      <p>
        Create and name a new plan or select an old one. Add{" "}
        <strong>Recipes</strong> for each day, then generate a shopping list
        based on which <strong>Pantry</strong> items are out of stock.
      </p>
      <div className={styles.Controls}>
        <PlanSelector />
        <AddNewWeek />
        <DeleteWeek />
      </div>
      {selectedPlan}
    </div>
  );
}
