import React from "react";
import styles from "./Recipes.module.scss";
import { connect } from "react-redux";
//Components
import Spinner from "../Spinner/Spinner";
import RecipeAddBtn from "./RecipeAddBtn/RecipeAddBtn";
import RecipeCard from "./RecipeCard/RecipeCard";
import TagsDisplay from "./TagsDisplay/TagsDisplay";
import RecipesFilter from "./RecipesFilter/RecipesFilter";

function Recipes({ recipes, uid, tags, filter, tagFilter }) {
  return (
    <div>
      <div className={styles.RecipesContainer}>
        <div className={styles.TitleAndControlsContainer}>
          <h1>Recipes</h1>
          <RecipeAddBtn />
          <RecipesFilter />
          <TagsDisplay tags={tags} />
        </div>

        <div className={styles.RecipesGrid}>
          {recipes ? (
            recipes.map(recipe => {
              //Filters by name
              if (
                recipe.userId === uid &&
                recipe.name.toLowerCase().includes(filter.toLowerCase()) &&
                tagFilter === "All"
              ) {
                return (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    imgUrl={recipe.imgUrl}
                    name={recipe.name}
                    tags={recipe.tags}
                  />
                );
              } else if (
                recipe.userId === uid &&
                recipe.name.toLowerCase().includes(filter.toLowerCase()) &&
                tagFilter !== "all"
              ) {
                //Filters by tag
                if (recipe.tags.includes(tagFilter)) {
                  return (
                    <RecipeCard
                      key={recipe.id}
                      id={recipe.id}
                      imgUrl={recipe.imgUrl}
                      name={recipe.name}
                      tags={recipe.tags}
                    />
                  );
                } else {
                  return null;
                }
              } else {
                return null;
              }
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
    tagFilter: state.recipes.tagFilter,
    filter: state.recipes.filter,
    uid: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps)(Recipes);
