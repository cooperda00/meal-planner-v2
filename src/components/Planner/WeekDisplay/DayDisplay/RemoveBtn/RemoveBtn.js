//Modules
import React from "react";
//CSS
import styles from "./RemoveBtn.module.scss";
//Reduc
import { connect } from "react-redux";
import { removeMeal } from "../../../../../store/actions/plannerActions";

function RemoveBtn(props) {
  const handleRemove = () => {
    const week = JSON.parse(JSON.stringify(props.week));
    const day = props.day - 1;
    const filteredDay = week[day].meals.filter(meal => {
      if (props.name !== meal.name && props.type !== meal.type) {
        return true;
      }
    });
    week[day].meals = filteredDay;
    props.removeMeal(props.weekId, week);
    console.log(week);
  };
  return (
    <div>
      <p onClick={handleRemove}> - </p>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    removeMeal: (planId, payload) => {
      dispatch(removeMeal(planId, payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RemoveBtn);
