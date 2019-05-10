//Modules
import React from "react";
//Sass
import styles from "./Spinner.module.scss";

const Spinner = props => {
  let margin = "0";

  if (props.marginTop) {
    margin = props.marginTop;
  }

  return (
    <div className={styles.loader} style={{ marginTop: margin }}>
      Loading...
    </div>
  );
};

export default Spinner;
