//Modules
import React from "react";
import { Link } from "react-router-dom";
import uuid4 from "uuid";
//CSS
import styles from "./IndividualRecipe.module.scss";
//Redux
import { connect } from "react-redux";
import {
  editPantryItem,
  addPantryItem
} from "../../../store/actions/pantryActions";

class IndividualRecipe extends React.Component {
  state = {
    confirmDelete: false
  };

  handleHaveChange = (ingName, isInPantry) => {
    const pantryItem = this.props.pantry.filter(item => {
      if (ingName === item.name) {
        return true;
      } else {
        return false;
      }
    })[0];
    const id = pantryItem.id;
    const newItem = {
      ...pantryItem,
      have: !isInPantry
    };
    this.props.editPantryItem(id, newItem);
  };

  render() {
    return (
      <div className={styles.IndividualRecipeContainer}>
        {/* NAME */}
        <h1 className={styles.IndividualRecipeTitle}>
          {this.props.recipe.name}
        </h1>

        {/* IMAGE */}
        <img
          src={this.props.recipe.imgUrl}
          alt={this.props.recipe.name}
          className={styles.IndividualRecipeImg}
        />

        {/* SOURCE */}

        <h5>
          {this.props.recipe.source
            ? this.props.recipe.source
            : "-No source given-"}
        </h5>

        {/* SERVES */}

        <div style={{ marginTop: "1rem" }}>
          <h3>Serves: {this.props.recipe.serves}</h3>
        </div>

        {/* TAGS */}
        <div className={styles.TagsContainer}>
          <h3>Tags:</h3>
          <ul>
            {this.props.recipe.tags.map(tag => {
              return <li key={uuid4()}>{tag}</li>;
            })}
          </ul>
        </div>

        {/* INGREDIENTS */}
        <div className={styles.IngredientsContainer}>
          <h3>Ingredients:</h3>
          <ul>
            {this.props.recipe.ingredients.map(ing => {
              // Compare ingredients in the recipe with ingredients
              // in the pantry and show checkbox based on this
              let isInPantry = false;
              let isInStock = false;
              this.props.pantry.find(i => {
                if (
                  i.name.toLowerCase() === ing.name.toLowerCase() &&
                  i.have === true
                ) {
                  isInPantry = true;
                  isInStock = true;
                } else if (
                  i.name.toLowerCase() === ing.name.toLowerCase() &&
                  i.have === false
                ) {
                  isInPantry = true;
                  isInStock = false;
                }
              });
              return (
                <li key={uuid4()}>
                  {ing.name}{" "}
                  <span>
                    {ing.amount} {ing.type}
                  </span>
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (isInPantry) {
                        this.handleHaveChange(ing.name, isInStock);
                      } else {
                        this.props.addPantryItem(this.props.uid, ing.name);
                      }
                    }}
                    onKeyPress={e => {
                      if (e.key === "Enter" && isInPantry) {
                        this.handleHaveChange(ing.name, isInStock);
                      } else {
                        this.props.addPantryItem(this.props.uid, ing.name);
                      }
                    }}
                    checked={isInStock}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* DIRECTIONS */}
        <div className={styles.DirectionsContainer}>
          <h3>Directions</h3>
          <ol>
            {this.props.recipe.instructions.map(ins => {
              return <li key={uuid4()}>{ins}</li>;
            })}
          </ol>
        </div>

        {/* PRICE */}
        {this.props.approxPriceAll}
        {this.props.approxPriceRemainder}

        {/* CONTROLS */}
        <div className={styles.Controls}>
          <button onClick={this.props.handleCancel} className={styles.Back}>
            Back
          </button>
          <Link to={`/recipes/edit/${this.props.id}`}>
            <button className={styles.Edit}>Edit</button>
          </Link>
          {this.state.confirmDelete ? (
            <button
              onClick={this.props.handleDeleteRecipe}
              className={styles.ConfirmDelete}
            >
              CONFIRM
            </button>
          ) : (
            <button
              onClick={() => {
                this.setState({
                  confirmDelete: true
                });
              }}
              className={styles.Delete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editPantryItem: (id, newItem) => {
      dispatch(editPantryItem(id, newItem));
    },

    addPantryItem: (id, name) => {
      dispatch(addPantryItem(id, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualRecipe);
