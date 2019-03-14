import React from "react";
import styles from "./ImgUrlForm.module.scss";
import AutosizeInput from "react-input-autosize";

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
