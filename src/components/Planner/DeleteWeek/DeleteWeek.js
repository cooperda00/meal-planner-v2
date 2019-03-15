import React from "react";
import styles from "./DeleteWeek.module.scss";
import { connect } from "react-redux";
import {
  deletePlan,
  changeSelectedPlan,
  setDefaultPlan
} from "../../../store/actions/plannerActions";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

function DeleteWeek(props) {
  const handleDeleteWeek = () => {
    props.deletePlan(props.planId);
    props.setDefaultPlan();
  };

  return (
    <div
      className={styles.Container}
      tabIndex="0"
      onKeyPress={e => {
        if (e.key === "Enter") {
          props.deletePlan(props.planId);
          props.setDefaultPlan();
        }
      }}
    >
      <div className={styles.Add} onClick={handleDeleteWeek}>
        <div className={styles.CrossContainer}>
          <div className={styles.Horizontal} />
        </div>
      </div>
    </div>
  );
}

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
