// Modules
import React from "react";
//CSS
import styles from "./RecipeAddBtn.module.scss";
import { withRouter } from "react-router-dom";

class RecipeAddBtn extends React.Component {
  handleClick = () => {
    this.props.history.push("/recipes/add");
  };

  render() {
    return (
      <button onClick={this.handleClick} className={styles.RecipeAddBtn}>
        New Recipe
      </button>
    );
  }
}

export default withRouter(RecipeAddBtn);
