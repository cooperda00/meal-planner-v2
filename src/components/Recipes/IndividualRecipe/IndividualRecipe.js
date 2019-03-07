//Modules
import React from "react";
import { Link } from "react-router-dom";
import uuid4 from "uuid";
//CSS
import styles from "./IndividualRecipe.module.scss";

class IndividualRecipe extends React.Component {
  state = {
    confirmDelete: false
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
              this.props.pantry.find(i => {
                if (
                  i.name.toLowerCase() === ing.name.toLowerCase() &&
                  i.have === true
                ) {
                  isInPantry = true;
                }
              });
              return (
                <li key={uuid4()}>
                  {ing.name}{" "}
                  <span>
                    {ing.amount} {ing.type}
                  </span>
                  <input type="checkbox" readOnly checked={isInPantry} />
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

export default IndividualRecipe;
