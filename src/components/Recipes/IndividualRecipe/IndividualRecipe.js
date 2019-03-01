//Modules
import React from "react";
import uuid4 from "uuid";
//CSS
import styles from "./IndividualRecipe.module.scss";
//Components
import Spinner from "../../Spinner/Spinner";
//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteRecipe } from "../../../store/actions/recipesActions";
//Database

class IndividualRecipe extends React.Component {
  handleCancel = () => {
    this.props.history.push("/recipes");
  };

  handleDeleteRecipe = () => {
    this.props.deleteRecipe(this.props.match.params.id);
    this.props.history.push("/recipes");
  };

  // getPrice = () => {
  //   const priceList = [];
  //   this.state.recipe.ingredients.map(ing => {
  //     this.state.ingredients.find(i => {
  //       if (i.name.toLowerCase() === ing.name.toLowerCase()) {
  //         priceList.push(i.price);
  //       }
  //     });
  //   });
  //   const tot = priceList.reduce((a, r) => {
  //     return Number(a) + Number(r);
  //   }, 0);

  //   return tot;
  // };

  render() {
    if (this.props.recipes) {
      const recipe = this.props.recipes[0];

      // const approxPrice = (
      //   <div className={styles.ApproxPrice}>
      //     <h3>
      //       Estimated Price: <span>฿ {this.getPrice()}</span>
      //     </h3>
      //   </div>
      // );

      return (
        <div className={styles.IndividualRecipeContainer}>
          <h1 className={styles.IndividualRecipeTitle}>{recipe.name}</h1>
          <img
            src={recipe.imgUrl}
            alt={recipe.name}
            className={styles.IndividualRecipeImg}
          />

          <div className={styles.TagsContainer}>
            <h3>Tags:</h3>
            <ul>
              {recipe.tags.map(tag => {
                return <li key={uuid4()}>{tag}</li>;
              })}
            </ul>
          </div>

          <div className={styles.IngredientsContainer}>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map(ing => {
                //Compare ingredients in the recipe with ingredients
                //in the pantry and show checkbox based on this
                // let isInPantry = false;
                // this.state.ingredients.find(i => {
                //   if (
                //     i.name.toLowerCase() === ing.name.toLowerCase() &&
                //     i.have === true
                //   ) {
                //     isInPantry = true;
                //   }
                // });
                return (
                  <li key={uuid4()}>
                    {ing.name}{" "}
                    <span>
                      {ing.amount} {ing.type}
                    </span>
                    <input type="checkbox" readOnly />
                    {/* checked={isInPantry} */}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.DirectionsContainer}>
            <h3>Directions</h3>
            <ol>
              {recipe.instructions.map(ins => {
                return <li key={uuid4()}>{ins}</li>;
              })}
            </ol>
          </div>

          {/* {approxPrice}  */}

          <div className={styles.Controls}>
            <button onClick={this.handleCancel}>Back</button>
            <button>Edit</button>
            <button onClick={this.handleDeleteRecipe}>Delete</button>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteRecipe: id => {
      dispatch(deleteRecipe(id));
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
      {
        collection: "recipes",
        doc: props.match.params.id
      }
    ];
  })
)(IndividualRecipe);
