import React from "react";
import styles from "./ServesForm.module.scss";
import AutosizeInput from "react-input-autosize";

export default function ServesForm(props) {
  return (
    <>
      <h3>
        <span className={styles.Manditory}>* </span>Serves:
      </h3>
      <AutosizeInput
        className={styles.ServesForm}
        type="number"
        value={props.value}
        onChange={props.handleServesChange}
        required
      />
    </>
  );
}
