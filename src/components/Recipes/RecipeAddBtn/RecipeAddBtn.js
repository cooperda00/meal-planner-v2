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
      <div className={styles.Add} onClick={this.handleClick}>
        <div className={styles.CrossContainer}>
          <div className={styles.Horizontal} />
          <div className={styles.Vertical} />
        </div>
      </div>
    );
  }
}

export default withRouter(RecipeAddBtn);
