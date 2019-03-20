import React from "react";
import styles from "./Spinner.module.scss";

export default function Spinner(props) {
  let margin = "0";
  if (props.marginTop) {
    margin = props.marginTop;
  }
  return (
    <div className={styles.loader} style={{ marginTop: margin }}>
      Loading...
    </div>
  );
}
