//Modules
import React from "react";
import AutosizeInput from "react-input-autosize";
//Sass
import styles from "./ServesForm.module.scss";

const ServesForm = props => {
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
};

export default ServesForm;
