import React from "react";
import styles from "./ImgUrlForm.module.scss";

export default function ImgUrlForm(props) {
  return (
    <>
      <h3>Recipe Image URL</h3>
      <input
        type="text"
        className={styles.AddRecipeImage}
        value={props.value}
        onChange={props.handleImgUrlChange}
      />
    </>
  );
}
