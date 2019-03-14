import React from "react";
import styles from "./AddNewWeek.module.scss";
//Redux
import { connect } from "react-redux";
import { addPlan } from "../../../store/actions/plannerActions";

function AddNewWeek(props) {
  const handleAddNewWeek = () => {
    props.addPlan(props.userId); //
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Add} onClick={handleAddNewWeek}>
        <div className={styles.CrossContainer}>
          <div className={styles.Horizontal} />
          <div className={styles.Vertical} />
        </div>
      </div>
    </div>
  );
}

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
