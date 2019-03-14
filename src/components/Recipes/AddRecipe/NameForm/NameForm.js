import React from "react";
import styles from "./NameForm.module.scss";

export default function NameForm(props) {
  return (
    <>
      <h3>Recipe Name:</h3>
      <input
        className={styles.AddRecipeTitle}
        type="text"
        value={props.value}
        onChange={props.handleNameChange}
        placeholder="Vegan One Pot Pasta"
        required
      />
    </>
  );
}
