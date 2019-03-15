//Modules
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
    if (this.props.userId) {
      return (
        <Planner
          plans={this.props.plans}
          selectedPlan={this.props.selectedPlan}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
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
    if (props.userId) {
      return [
        {
          collection: "plans",
          orderBy: ["timeStamp", "desc"],
          where: ["userId", "==", props.userId]
        }
      ];
    } else return [];
  })
)(PlannerContainer);
