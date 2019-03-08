import React from "react";
import styles from "./AddNewWeek.module.scss";
//Redux
import { connect } from "react-redux";
import { addPlan } from "../../../store/actions/plannerActions";

function AddNewWeek(props) {
  const handleAddNewWeek = () => {
    const payload = {
      week: [
        {
          day: 1,
          meals: [
            {
              type: "Breakfast",
              name: "Oatmeal"
            }
          ]
        },
        {
          day: 2,
          meals: [{ type: "lunch", name: "Veg Sandwich" }]
        },
        {
          day: 3,
          meals: []
        },
        {
          day: 4,
          meals: []
        },
        {
          day: 5,
          meals: []
        },
        {
          day: 6,
          meals: []
        },
        {
          day: 7,
          meals: []
        }
      ]
    };
    props.addPlan(props.userId, payload); //
    console.log("...adding");
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
