//Modules
import React, { Component } from "react";
//Components
import Pantry from "./Pantry";
//Redux
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addPantryItem,
  removePantryItem,
  editPantryItem,
  editIngredientCheckbox
} from "../../store/actions/pantryActions";
//Firebase
import { firestoreConnect } from "react-redux-firebase";

class PantryContainer extends Component {
  //PANTRY CRUD OPERATIONS
  handleAddIngredient = () => {
    this.props.addPantryItem();
  };

  handleEditIngredient = (id, type, change) => {
    const newData = { [type]: change };
    this.props.editPantryItem(id, newData);
  };

  handleEditIngredientCheckbox = id => {
    this.props.editIngredientCheckbox(id);
  };

  handleDeleteIngredient = id => {
    this.props.removePantryItem(id);
  };

  render() {
    return (
      <Pantry
        ingredients={this.props.ingredients}
        handleAddIngredient={this.handleAddIngredient}
        handleDeleteIngredient={this.handleDeleteIngredient}
        handleEditIngredient={this.handleEditIngredient}
        handleEditIngredientCheckbox={this.handleEditIngredientCheckbox}
      />
    );
  }
}

//STORE
const mapStateToProps = state => {
  const ingredients = state.firestore.ordered.pantry;
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
    },
    editIngredientCheckbox: id => {
      dispatch(editIngredientCheckbox(id));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "pantry" }])
)(PantryContainer);
