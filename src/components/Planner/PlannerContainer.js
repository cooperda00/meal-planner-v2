//Modules
import React, { Component } from "react";
//Redux
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Components
import Planner from "./Planner";

class PlannerContainer extends Component {
  render() {
    return <Planner plans={this.props.plans} />;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    plans: state.firestore.ordered.plans
  };
};

export default compose(
  connect(mapStateToProps),
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
