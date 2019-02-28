import React from "react";
import styles from "./Recipes.module.scss";
//Components
import Spinner from "../Spinner/Spinner";
import RecipeAddBtn from "./RecipeAddBtn/RecipeAddBtn";
import { connect } from "react-redux";

function Recipes({ recipes, uid }) {
  console.log(recipes);
  return (
    <div>
      <div className={styles.RecipesContainer}>
        <div className={styles.TitleAndControlsContainer}>
          <h1>Recipes</h1>
          <RecipeAddBtn />
          {/* <RecipesFilter filterByName={this.filterByName} /> */}
          {/* <TagsDisplay tags={this.state.tags} filterByTag={this.filterByTag} /> */}
        </div>

        <div className={styles.RecipesGrid}>
          {recipes ? (
            recipes.map(recipe => {
              if (recipe.userId === uid) {
                return <p>{recipe.name}</p>;
              } else {
                return null;
              }

              // <RecipeCard
              //   key={recipe.id}
              //   id={recipe.id}
              //   imgUrl={recipe.imgUrl}
              //   name={recipe.name}
              //   tags={recipe.tags}
              // />
            })
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps)(Recipes);
