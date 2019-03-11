//Modules
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { setDefaultPlan } from "../../store/actions/plannerActions";
//Components
import Planner from "./Planner";

class PlannerContainer extends Component {
  componentDidMount() {
    this.props.setDefaultPlan();
  }

  render() {
    return (
      <Planner
        plans={this.props.plans}
        selectedPlan={this.props.selectedPlan}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedPlan: state.planner.selectedPlan,
    userId: state.firebase.auth.uid,
    plans: state.firestore.ordered.plans
  };
};

const mapDispatchToProps = dispatch => {
  return {
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
)(PlannerContainer);
