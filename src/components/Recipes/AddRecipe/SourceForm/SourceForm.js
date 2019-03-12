import React from "react";
import styles from "./SourceForm.module.scss";

export default function SourceForm(props) {
  return (
    <>
      <h3>Source: </h3>
      <input
        className={styles.AddSource}
        type="text"
        value={props.value}
        onChange={props.handleSourceChange}
      />
    </>
  );
}
