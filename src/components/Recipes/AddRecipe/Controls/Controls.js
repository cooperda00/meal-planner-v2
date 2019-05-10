//Modules
import React from "react";
//Sass
import styles from "./Controls.module.scss";

export default function Controls(props) {
  return (
    <div className={styles.Controls}>
      <button className={styles.Save} onClick={props.handleSubmit}>
        Save
      </button>
      <button onClick={props.handleGoBack} className={styles.Back}>
        Back
      </button>
    </div>
  );
}
