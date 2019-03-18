//Modules
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { addRecipe } from "../../../store/actions/recipesActions";
//CSS
import styles from "./AddRecipe.module.scss";
//Components
import NameForm from "./NameForm/NameForm";
import ImgUrlForm from "./ImgUrlForm/ImgUrlForm";
import TagsForm from "./TagsForm/TagsForm";
import IngredientsForm from "./IngredientsForm/IngredientsForm";
import InstructionsForm from "./InstructionsForm/InstructionsForm";
import Controls from "./Controls/Controls";
import SourceForm from "./SourceForm/SourceForm";
import ServesForm from "./ServesForm/ServesForm";

class AddRecipe extends Component {
  state = {
    recipe: {
      tags: [],
      ingredients: [],
      instructions: [],
      name: "",
      imgUrl: "",
      serves: 1
    },
    tagToAdd: "",
    ingredientToAdd: {
      name: "",
      amount: 0,
      type: ""
    },
    instructionToAdd: "",
    warningMessage: ""
  };

  handleSubmit = () => {
    const id = this.props.uid;
    const payload = this.state.recipe;
    if (
      payload.tags.length > 0 &&
      payload.ingredients.length > 0 &&
      payload.instructions.length > 0 &&
      payload.name
    ) {
      this.props.addRecipe(id, payload);
      //Reset State
      this.setState({
        recipe: {
          tags: [],
          ingredients: [],
          instructions: [],
          name: "",
          imgUrl: "",
          source: "",
          serves: 1
        }
      });
      this.props.history.push("/recipes");
    } else {
      this.setState({
        warningMessage:
          "Please fill out fields. Only image and source are optional."
      });
    }
  };

  handleNameChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        name: e.target.value
      }
    });
  };

  handleServesChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        serves: e.target.value
      }
    });
  };

  handleSourceChange = e => {
    this.setState({
      recipe: {
        ...this.state.recipe,
        source: e.target.value
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
    //Format tag
    let tag = this.state.tagToAdd
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

  //REMOVE BULLETS FROM STATE
  handleRemove = (type, name) => {
    if (type === "tag") {
      const filteredTags = this.state.recipe.tags.filter(tag => tag !== name);
      this.setState({
        recipe: {
          ...this.state.recipe,
          tags: filteredTags
        }
      });
    } else if (type === "ins") {
      const filteredInstructions = this.state.recipe.instructions.filter(
        ins => ins !== name
      );
      this.setState({
        recipe: {
          ...this.state.recipe,
          instructions: filteredInstructions
        }
      });
    } else if (type === "ing") {
      const filteredIngredients = this.state.recipe.ingredients.filter(
        ing => ing.name !== name
      );
      this.setState({
        recipe: {
          ...this.state.recipe,
          ingredients: filteredIngredients
        }
      });
    }
  };

  render() {
    //Route Blocker
    if (!this.props.uid) {
      return <Redirect to="/" />;
    }

    return (
      <div className={styles.AddRecipeContainer}>
        <h1>Add Recipe</h1>
        <NameForm
          value={this.state.recipe.name}
          handleNameChange={this.handleNameChange}
        />
        <ServesForm
          value={this.state.recipe.serves}
          handleServesChange={this.handleServesChange}
        />
        <SourceForm
          value={this.state.recipe.source}
          handleSourceChange={this.handleSourceChange}
        />
        <ImgUrlForm
          value={this.state.recipe.imgUrl}
          handleImgUrlChange={this.handleImgUrlChange}
        />

        <TagsForm
          tags={this.state.recipe.tags}
          handleAddTag={this.handleAddTag}
          value={this.state.tagtoAdd}
          handleChangeToAdd={this.handleChangeToAdd}
          handleRemove={this.handleRemove}
        />
        <IngredientsForm
          ingredients={this.state.recipe.ingredients}
          handleAddIngredient={this.handleAddIngredient}
          value1={this.state.ingredientToAdd[0]}
          value2={this.state.ingredientToAdd[1]}
          value3={this.state.ingredientToAdd[2]}
          handleChangeIngredientToAdd={this.handleChangeIngredientToAdd}
          handleRemove={this.handleRemove}
        />
        <InstructionsForm
          instructions={this.state.recipe.instructions}
          handleAddInstruction={this.handleAddInstruction}
          value={this.state.instructionToAdd}
          handleChangeInstructionToAdd={this.handleChangeInstructionToAdd}
          handleRemove={this.handleRemove}
        />
        <Controls
          handleSubmit={this.handleSubmit}
          handleGoBack={this.handleGoBack}
        />
        <p>{this.state.warningMessage}</p>
      </div>
    );
  }
}

//Redux
const mapDispatchToProps = dispatch => ({
  addRecipe: (id, payload) => {
    dispatch(addRecipe(id, payload));
  }
});
const mapStateToProps = state => ({
  uid: state.firebase.auth.uid
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddRecipe)
);
