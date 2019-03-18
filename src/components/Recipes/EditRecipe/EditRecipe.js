//Modules
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { updateRecipe } from "../../../store/actions/recipesActions";
//CSS
import styles from "./EditRecipe.module.scss";
//Components
import NameForm from "./NameForm/NameForm";
import ImgUrlForm from "./ImgUrlForm/ImgUrlForm";
import TagsForm from "./TagsForm/TagsForm";
import IngredientsForm from "./IngredientsForm/IngredientsForm";
import InstructionsForm from "./InstructionsForm/InstructionsForm";
import Controls from "./Controls/Controls";
import SourceForm from "./SourceForm/SourceForm";
import ServesForm from "./ServesForm/ServesForm";

class EditRecipe extends Component {
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
    initialPopulate: true
  };

  componentDidMount() {
    this.setState({
      initialPopulate: true
    });
  }

  componentDidUpdate() {
    if (this.props.recipes && this.state.initialPopulate === true) {
      this.populateForEdit();
    }
  }

  populateForEdit = () => {
    const recipe = this.props.recipes[0];
    this.setState({
      recipe: {
        tags: recipe.tags,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        name: recipe.name,
        imgUrl: recipe.imgUrl,
        source: recipe.source,
        serves: recipe.serves
      },
      initialPopulate: false
    });
  };

  handleSubmit = () => {
    const id = this.props.match.params.id;
    const payload = this.state.recipe;
    this.props.updateRecipe(id, payload);
    this.setState({
      recipe: {
        tags: [],
        ingredients: [],
        instructions: [],
        name: "",
        imgUrl: "",
        serves: 1
      }
    });
    this.props.history.push(`/recipes/${id}`);
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
    const id = this.props.match.params.id;
    this.props.history.push(`/recipes/${id}`);
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
        <h1>Edit Recipe</h1>
        <NameForm
          value={this.state.recipe.name}
          handleNameChange={this.handleNameChange}
        />
        <ServesForm
          value={this.state.recipe.serves}
          handleServesChange={this.handleServesChange}
        />
        <ImgUrlForm
          value={this.state.recipe.imgUrl}
          handleImgUrlChange={this.handleImgUrlChange}
        />
        <SourceForm
          value={this.state.recipe.source}
          handleSourceChange={this.handleSourceChange}
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
      </div>
    );
  }
}

//Redux
const mapDispatchToProps = dispatch => ({
  updateRecipe: (id, payload) => {
    dispatch(updateRecipe(id, payload));
  }
});
const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    uid: state.firebase.auth.uid
  };
};
export default withRouter(
  compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    firestoreConnect(props => {
      return [{ collection: "recipes", doc: props.match.params.id }];
    })
  )(EditRecipe)
);
