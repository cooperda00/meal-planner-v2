//Modules
import React, { Component } from "react";
//CSS
import styles from "./WeekDisplay.module.scss";
//Redux
import { connect } from "react-redux";
import { updatePlanName } from "../../../store/actions/plannerActions";
//Components
import DayDisplay from "./DayDisplay/DayDisplay";

class WeekDisplay extends Component {
  state = {
    name: ""
  };

  componentDidMount() {
    this.setState({
      name: this.props.plan.planName
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.plan.id;
    const payload = this.state.name;
    this.props.updatePlanName(id, payload);
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    if (this.props.plan) {
      return (
        <div className={styles.WeekDisplay}>
          <form onSubmit={this.handleSubmit} className={styles.NameForm}>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <button>Change Name</button>
          </form>

          {this.props.plan.week.map(day => {
            return (
              <DayDisplay
                data={day}
                key={this.props.plan.userId + day.day}
                weekId={this.props.plan.id}
                week={this.props.plan.week}
              />
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updatePlanName: (planId, payload) => {
      dispatch(updatePlanName(planId, payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(WeekDisplay);
