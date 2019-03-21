//Modules
import React, { Component } from "react";
//CSS
import styles from "./WeekDisplay.module.scss";
//Redux
import { connect } from "react-redux";
import {
  updatePlanName,
  toggleBackdrop
} from "../../../store/actions/plannerActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
//Components
import DayDisplay from "./DayDisplay/DayDisplay";
import ShoppingList from "./ShoppingList/ShoppingList";

class WeekDisplay extends Component {
  state = {
    name: "",
    month: "",
    week: "",
    shoppingList: [],
    modalOpen: false
  };

  componentDidMount() {
    this.setState({
      name: this.props.plan.planName
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.month !== "" && this.state.week !== "") {
      const id = this.props.plan.id;
      const payload = `${this.state.month} ${this.state.week}`;
      this.props.updatePlanName(id, payload);
    }
  };

  handleNameChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  handleGenShoppingList = () => {
    this.genShoppingList();
    this.toggleModal();
  };

  genShoppingList = () => {
    const plannerRecipes = [];
    //Put all recipes for the list on an array
    const week = [...this.props.plan.week];
    week.forEach(day => {
      day.meals.forEach(meal => {
        plannerRecipes.push(meal.name);
      });
    });
    //Remove dupes using a Set
    const set = new Set(plannerRecipes);
    const recipeList = Array.from(set);
    /////////////////////////////////////////////////
    //Get ingredients for recipe
    const ingredientsArray = [];
    const recipes = this.props.recipes;
    recipes.map(recipe => {
      recipeList.map(recipeName => {
        if (recipeName === recipe.name) {
          recipe.ingredients.forEach(ing => {
            ingredientsArray.push(ing.name);
          });
        }
      });
    });
    /////////////////////////////////////////////////
    // Create output array
    const output = [];
    this.props.pantry.forEach(item => {
      ingredientsArray.forEach(ing => {
        if (item.name === ing && item.have === false) {
          // output.push(`${item.name} : ฿${item.price} per ${item.per}`);
          output.push(item);
        }
      });
    });
    this.setState({
      shoppingList: output,
      showModal: true
    });
  };

  render() {
    if (this.props.plan) {
      return (
        <div className={styles.WeekDisplay}>
          {this.state.modalOpen && (
            <ShoppingList
              shoppingList={this.state.shoppingList}
              toggleModal={this.toggleModal}
            />
          )}
          <div className={styles.Header}>
            <div className={styles.Title}>
              <h3>Meal Plan: </h3>
              <h3>{this.props.plan.planName}</h3>
              <button onClick={this.handleGenShoppingList}>
                Generate Shopping List
              </button>
            </div>

            <div className={styles.Form}>
              <h4>Name/Rename Plan:</h4>
              <form onSubmit={this.handleSubmit} className={styles.NameForm}>
                <select onChange={this.handleNameChange} id="month">
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  placeholder="Week"
                  onChange={this.handleNameChange}
                  id="week"
                  value={this.state.week}
                >
                  <option value="">Select Week</option>
                  <option value="Week 1">Week 1</option>
                  <option value="Week 2">Week 2</option>
                  <option value="Week 3">Week 3</option>
                  <option value="Week 4">Week 4</option>
                  <option value="Week 5">Week 5</option>
                </select>
                <button>Save</button>
              </form>
            </div>
          </div>

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

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    pantry: state.firestore.ordered.pantry,
    recipes: state.firestore.ordered.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlanName: (planId, payload) => {
      dispatch(updatePlanName(planId, payload));
    },
    toggleBackdrop: () => {
      dispatch(toggleBackdrop());
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
      { collection: "pantry", where: ["userId", "==", props.uid] },
      { collection: "recipes", where: ["userId", "==", props.uid] }
    ];
  })
)(WeekDisplay);
