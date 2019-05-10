//Modules
import React from "react";
//CSS
import styles from "./IndividualRecipe.module.scss";
//Components
import Spinner from "../../Spinner/Spinner";
import IndividualRecipe from "./IndividualRecipe";
//Redux
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { deleteRecipe } from "../../../store/actions/recipesActions";

class IndividualRecipeContainer extends React.Component {
  handleCancel = () => {
    this.props.history.push("/recipes");
  };

  handleDeleteRecipe = () => {
    this.props.deleteRecipe(this.props.match.params.id);
    this.props.history.push("/recipes");
  };

  render() {
    //Check for props
    if (this.props.recipes && this.props.pantry) {
      const recipe = this.props.recipes[0];
      const pantry = this.props.pantry;

      const getPrice = type => {
        //Get price for all ingredients
        if (recipe && pantry) {
          const priceList = [];
          if (type === "all") {
            recipe.ingredients.map(ing => {
              pantry.find(i => {
                if (i.name.toLowerCase() === ing.name.toLowerCase()) {
                  priceList.push(i.price);
                }
              });
            });
            const tot = priceList.reduce((a, r) => {
              return Number(a) + Number(r);
            }, 0);

            return tot;
            //Get price for missing ingredients
          } else if (type === "remainder") {
            recipe.ingredients.map(ing => {
              pantry.find(i => {
                if (
                  i.name.toLowerCase() === ing.name.toLowerCase() &&
                  i.have === false
                ) {
                  priceList.push(i.price);
                }
              });
            });
            const tot = priceList.reduce((a, r) => {
              return Number(a) + Number(r);
            }, 0);
            return tot;
          }
        }
      };

      //Price Displays
      const approxPriceAll = (
        <div className={styles.ApproxPrice}>
          <h3>Cost to buy all ingredients:</h3>
          <p>฿ {getPrice("all")}</p>
        </div>
      );
      const approxPriceRemainder = (
        <div className={styles.ApproxPrice}>
          <h3>Cost to by missing ingredients: </h3>
          <p>฿ {getPrice("remainder")}</p>
        </div>
      );

      return (
        <IndividualRecipe
          approxPriceAll={approxPriceAll}
          approxPriceRemainder={approxPriceRemainder}
          recipe={recipe}
          pantry={pantry}
          handleCancel={this.handleCancel}
          handleDeleteRecipe={this.handleDeleteRecipe}
          id={this.props.match.params.id}
        />
      );
    } else {
      return <Spinner marginTop="5rem" />;
    }
  }
}

//Redux
const mapStateToProps = state => {
  return {
    recipes: state.firestore.ordered.recipes,
    pantry: state.firestore.ordered.pantry,
    uid: state.firebase.auth.uid
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
      },
      {
        collection: "pantry",
        where: ["userId", "==", props.uid]
      }
    ];
  })
)(IndividualRecipeContainer);
