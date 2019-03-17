//Modules
import React, { Component } from "react";
//CSS
import styles from "./AddMeal.module.scss";
//Redux
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { addMeal } from "../../../../../store/actions/plannerActions";
//Components
import Spinner from "../../../../Spinner/Spinner";

class AddMeal extends Component {
  state = {
    name: "",
    type: "Breakfast",
    id: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name !== "Select Meal" && this.state.name !== "") {
      //Make a deep copy of the week and get correct index
      const week = JSON.parse(JSON.stringify(this.props.week));
      const day = this.props.day - 1;
      //Push to new array
      week[day].meals.push(this.state);
      //Update store
      this.props.addMeal(this.props.weekId, week);
      //Close menu
      this.props.showAddMeal();
    }
  };

  handleChange = e => {
    if (e.target.id === "name") {
      this.props.recipes.forEach(recipe => {
        if (recipe.name === e.target.value) {
          console.log(recipe.name, recipe.id);
          this.setState({
            id: recipe.id
          });
        }
      });
    }
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    return (
      <div className={styles.AddMeal}>
        <div className={styles.TitleAndBack}>
          <div onClick={this.props.showAddMeal}>X</div>
        </div>
        {this.props.recipes ? (
          <form action="" onSubmit={this.handleSubmit}>
            <select
              name="type"
              id="type"
              value={this.state.type}
              onChange={this.handleChange}
              className={styles.Input}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
            <select
              id="name"
              value={this.state.name}
              onChange={this.handleChange}
              className={styles.Input}
            >
              <option value="Select Meal">Select Recipe</option>
              {this.props.recipes &&
                this.props.recipes.map(recipe => {
                  return (
                    <option value={recipe.name} key={recipe.id}>
                      {recipe.name}
                    </option>
                  );
                })}
            </select>

            <button className={styles.AddMealSubmit}>Add To Plan</button>
          </form>
        ) : (
          <p>...Loading</p>
        )}
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

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    recipes: state.firestore.ordered.recipes
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
        collection: "recipes",
        where: ["userId", "==", props.userId]
      }
    ];
  })
)(AddMeal);
