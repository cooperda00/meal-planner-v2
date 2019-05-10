//Modules
import React from "react";
import AutosizeInput from "react-input-autosize";
//Sass
import styles from "./ImgUrlForm.module.scss";

export default function ImgUrlForm(props) {
  return (
    <>
      <h3>Recipe Image URL</h3>
      <AutosizeInput
        type="text"
        className={styles.AddRecipeImage}
        value={props.value}
        onChange={props.handleImgUrlChange}
      />
    </>
  );
}
