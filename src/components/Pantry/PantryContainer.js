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
  state = {
    ingredients: []
  };
  componentDidMount() {
    setTimeout(() => {
      console.log(this.props);
    }, 5000);
  }
  //PANTRY CRUD OPERATIONS
  handleAddIngredient = () => {
    const id = this.props.auth.uid;
    this.props.addPantryItem(id);
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
    ingredients,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPantryItem: id => {
      dispatch(addPantryItem(id));
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
  firestoreConnect(["pantry"])
)(PantryContainer);
