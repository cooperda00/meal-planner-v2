import React from "react";
import styles from "./SourceForm.module.scss";
import AutosizeInput from "react-input-autosize";

export default function SourceForm(props) {
  return (
    <>
      <h3>Source: </h3>
      <AutosizeInput
        className={styles.AddSource}
        type="text"
        value={props.value}
        onChange={props.handleSourceChange}
        placeholder="My Vegan Blog"
      />
    </>
  );
}
