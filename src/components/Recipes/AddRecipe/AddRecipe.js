import React, { Component } from "react";
import styles from "./AddRecipe.module.scss";
import uuid4 from "uuid";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { addRecipe } from "../../../store/actions/recipesActions";

class AddRecipe extends Component {
  state = {
    recipe: {
      tags: [],
      ingredients: [],
      instructions: [],
      name: "",
      imgUrl: ""
    },
    tagToAdd: "",
    ingredientToAdd: {
      name: "",
      amount: 0,
      type: ""
    },
    instructionToAdd: ""
  };

  handleSubmit = () => {
    const id = this.props.uid;
    const payload = this.state.recipe;
    this.props.addRecipe(id, payload);
    this.props.history.push("/recipes");
  };

  handleNameChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        name: e.target.value
      }
    });
  };

  handleImgUrlChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        imgUrl: e.target.value
      }
    });
  };

  handleChangeToAdd = e => {
    this.setState({
      tagToAdd: e.target.value
    });
  };

  handleAddTag = e => {
    e.preventDefault();
    let tag = this.state.tagToAdd;
    const tags = [...this.state.recipe.tags, tag];
    this.setState(() => {
      return {
        recipe: {
          ...this.state.recipe,
          tags: tags
        },
        tagToAdd: ""
      };
    });
    e.target.elements.tag.value = "";
  };

  handleChangeIngredientToAdd = e => {
    this.setState({
      ingredientToAdd: {
        ...this.state.ingredientToAdd,
        [e.target.name]: e.target.value
      }
    });
  };

  handleAddIngredient = e => {
    e.preventDefault();
    let ingredient = this.state.ingredientToAdd;
    const ingredients = [...this.state.recipe.ingredients, ingredient];
    this.setState(() => {
      return {
        recipe: {
          ...this.state.recipe,
          ingredients: ingredients
        },
        ingredientToAdd: {
          name: "",
          amount: 0,
          type: ""
        }
      };
    });
    e.target.elements.name.value = "";
    e.target.elements.amount.value = "";
    e.target.elements.type.value = "";
  };

  handleChangeInstructionToAdd = e => {
    this.setState({
      instructionToAdd: e.target.value
    });
  };

  handleAddInstruction = e => {
    e.preventDefault();
    let instruction = this.state.instructionToAdd;
    const instructions = [...this.state.recipe.instructions, instruction];

    this.setState(() => {
      return {
        recipe: {
          ...this.state.recipe,
          instructions: instructions
        },
        instructionToAdd: ""
      };
    });
    e.target.elements.instruction.value = "";
  };

  handleGoBack = () => {
    this.props.history.push("/recipes");
  };

  render() {
    if (!this.props.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.AddRecipeContainer}>
        <h1>Add Recipe</h1>
        {/* NAME */}
        <h3>Recipe Name:</h3>
        <input
          className={styles.AddRecipeTitle}
          type="text"
          value={this.state.recipe.name}
          onChange={this.handleNameChange}
          required
        />
        {/* IMG URL */}
        <h3>Recipe Image URL</h3>
        <input
          type="text"
          className={styles.AddRecipeImage}
          value={this.state.recipe.imgUrl}
          onChange={this.handleImgUrlChange}
        />
        {/* TAGS: DISPLAY */}
        <div className={styles.AddTagsContainer}>
          <h3>Tags:</h3>
          <ul>
            {this.state.recipe.tags.map(tag => (
              <li key={uuid4()}>{tag}</li>
            ))}
          </ul>
          {/* TAGS: ADD */}
          <form onSubmit={this.handleAddTag}>
            <input
              type="text"
              name="tag"
              value={this.state.tagtoAdd}
              onChange={this.handleChangeToAdd}
              required
            />
            <input type="submit" value="+" />
          </form>
        </div>
        {/* INGREDIENT: SHOW */}
        <div className={styles.AddIngredientsContainer}>
          <h3>Ingredients:</h3>
          <ul>
            {this.state.recipe.ingredients.map(ing => (
              <li key={uuid4()}>
                {ing.name}{" "}
                <span>
                  {ing.amount} {ing.type}
                </span>
              </li>
            ))}
          </ul>
          {/* INGREDIENT: ADD */}
          <form onSubmit={this.handleAddIngredient}>
            <input
              type="text"
              name="name"
              value={this.state.ingredientToAdd[0]}
              onChange={this.handleChangeIngredientToAdd}
              required
            />
            <input
              className={styles.Num}
              type="number"
              name="amount"
              value={this.state.ingredientToAdd[1]}
              onChange={this.handleChangeIngredientToAdd}
              required
            />
            <input
              className={styles.Type}
              type="text"
              name="type"
              value={this.state.ingredientToAdd[2]}
              onChange={this.handleChangeIngredientToAdd}
            />
            <input type="submit" value="+" />
          </form>
        </div>
        {/* INSTRUCTIONS: SHOW */}
        <div className={styles.AddInstructionsContainer}>
          <h3>Instructions:</h3>
          <ol>
            {this.state.recipe.instructions.map(ins => (
              <li key={uuid4()}>{ins}</li>
            ))}
          </ol>
          {/* INSTRUCTIONS: ADD */}
          <form onSubmit={this.handleAddInstruction}>
            <textarea
              name="instruction"
              value={this.state.instructionToAdd}
              onChange={this.handleChangeInstructionToAdd}
              required
            />
            <input type="submit" value="+" />
          </form>
        </div>
        <div className={styles.Controls}>
          <button className={styles.Save} onClick={this.handleSubmit}>
            Save
          </button>
          <button onClick={this.handleGoBack} className={styles.Back}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRecipe: (id, payload) => {
      dispatch(addRecipe(id, payload));
    }
  };
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddRecipe)
);
