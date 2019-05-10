//Modules
import React from "react";
import AutosizeInput from "react-input-autosize";
//Sass
import styles from "./NameForm.module.scss";

const NameForm = props => {
  return (
    <>
      <h3>
        <span className={styles.Manditory}>* </span>Recipe Name:
      </h3>
      <AutosizeInput
        className={styles.AddRecipeTitle}
        type="text"
        value={props.value}
        onChange={props.handleNameChange}
        placeholder="Vegan One Pot Pasta"
        required
      />
    </>
  );
};

export default NameForm;
