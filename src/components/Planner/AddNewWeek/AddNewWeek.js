//Modules
import React from "react";
//Sass
import styles from "./AddNewWeek.module.scss";
//Redux
import { connect } from "react-redux";
import { addPlan } from "../../../store/actions/plannerActions";

const AddNewWeek = ({ userId, addPlan }) => {
  return (
    <button
      className={styles.AddPlanBtn}
      onClick={() => {
        addPlan(userId);
      }}
    >
      Create Plan
    </button>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlan: (userId, payload) => {
      dispatch(addPlan(userId, payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewWeek);
