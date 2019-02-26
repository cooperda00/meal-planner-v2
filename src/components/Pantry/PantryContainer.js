//Modules
import React, { Component } from "react";
//Components
import Pantry from "./Pantry";
//Redux
import { connect } from "react-redux";
import {
  addPantryItem,
  removePantryItem,
  editPantryItem
} from "../../store/actions/pantryActions";

class PantryContainer extends Component {
  //PANTRY CRUD OPERATIONS
  handleAddIngredient = () => {
    this.props.addPantryItem();
  };

  handleEditIngredient = (id, type, change) => {
    const updatedIngredients = this.props.ingredients.map(ingredient => {
      if (ingredient.id === id && type === "name") {
        return { ...ingredient, name: change };
      } else if (ingredient.id === id && type === "price") {
        return { ...ingredient, price: change };
      } else if (ingredient.id === id && type === "per") {
        return { ...ingredient, per: change };
      } else if (ingredient.id === id && type === "have") {
        return { ...ingredient, have: !ingredient.have };
      } else {
        return ingredient;
      }
    });
    this.props.editPantryItem(id, updatedIngredients);
  };

  handleDeleteIngredient = id => {
    this.props.removePantryItem(id);
  };

  render() {
    return (
      <Pantry
        data={this.props}
        handleAddIngredient={this.handleAddIngredient}
        handleDeleteIngredient={this.handleDeleteIngredient}
        handleEditIngredient={this.handleEditIngredient}
      />
    );
  }
}

//STORE
const mapStateToProps = state => {
  const ingredients = state.pantry.pantry;
  return {
    ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPantryItem: () => {
      dispatch(addPantryItem());
    },
    removePantryItem: id => {
      dispatch(removePantryItem(id));
    },
    editPantryItem: (id, newItem) => {
      dispatch(editPantryItem(id, newItem));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryContainer);
