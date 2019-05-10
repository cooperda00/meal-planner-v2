//Modules
import React from "react";
//Sass
import styles from "./DeleteWeek.module.scss";
//Redux
import { connect } from "react-redux";
import {
  deletePlan,
  changeSelectedPlan,
  setDefaultPlan
} from "../../../store/actions/plannerActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const DeleteWeek = props => {
  const handleDeleteWeek = () => {
    props.deletePlan(props.planId);
    props.setDefaultPlan();
  };

  return (
    <button className={styles.DeletePlanBtn} onClick={handleDeleteWeek}>
      Delete Plan
    </button>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    planId: state.planner.selectedPlan,
    recentPlan: state.firestore.ordered.plans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletePlan: planId => {
      dispatch(deletePlan(planId));
    },

    changeSelectedPlan: planId => {
      dispatch(changeSelectedPlan(planId));
    },

    setDefaultPlan: () => {
      dispatch(setDefaultPlan());
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(props => {
    return [
      {
        collection: "plans",
        orderBy: ["timeStamp", "desc"],
        where: ["userId", "==", props.userId]
      }
    ];
  })
)(DeleteWeek);
