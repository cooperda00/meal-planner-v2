//Modules
import React from "react";
import AutosizeInput from "react-input-autosize";
//Sass
import styles from "./SourceForm.module.scss";

export default function SourceForm(props) {
  return (
    <>
      <h3>Source: </h3>
      <AutosizeInput
        className={styles.AddSource}
        type="text"
        value={props.value}
        onChange={props.handleSourceChange}
      />
    </>
  );
}
