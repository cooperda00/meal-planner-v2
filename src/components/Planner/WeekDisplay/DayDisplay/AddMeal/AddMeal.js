//Modules
import React, { Component } from "react";
//CSS
import styles from "./AddMeal.module.scss";
//Redux
import { connect } from "react-redux";
import { addMeal } from "../../../../../store/actions/plannerActions";

class AddMeal extends Component {
  state = {
    name: "",
    type: ""
  };

  handleSubmit = e => {
    const week = JSON.parse(JSON.stringify(this.props.week));
    const day = this.props.day - 1;
    week[day].meals.push(this.state);
    this.props.addMeal(this.props.weekId, week);
    e.preventDefault();
    this.props.showAddMeal();
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className={styles.AddMeal}>
        <div className={styles.TitleAndBack}>
          <p>Add Meal Menu</p>
          <div onClick={this.props.showAddMeal}>X</div>
        </div>

        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="">
            Recipe:
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="">
            Meal:
            <input
              id="type"
              type="text"
              value={this.state.type}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.AddMealSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMeal: (planId, payload) => {
      dispatch(addMeal(planId, payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddMeal);
