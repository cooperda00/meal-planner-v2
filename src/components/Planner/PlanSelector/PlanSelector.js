import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import uuid4 from "uuid";
import { changeSelectedPlan } from "../../../store/actions/plannerActions";
import styles from "./PlanSelector.module.scss";

class PlanSelector extends Component {
  handlePlanChange = e => {
    if (e.target.value !== "instructions") {
      this.props.changeSelectedPlan(e.target.value);
    }
  };

  render() {
    return (
      <div className={styles.PlanSelector}>
        <select
          onChange={this.handlePlanChange}
          id="planChange"
          placeholder="Select weekly plan"
        >
          <option value="instructions">Select Old Plans</option>
          {this.props.plans &&
            this.props.plans.map(plan => {
              return (
                <option value={plan.id} key={uuid4()}>
                  {plan.planName}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    plans: state.firestore.ordered.plans
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeSelectedPlan: planId => {
      dispatch(changeSelectedPlan(planId));
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
)(PlanSelector);
