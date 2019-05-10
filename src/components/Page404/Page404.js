//Modules
import React from "react";
import { Link } from "react-router-dom";
//Sass
import styles from "./Page404.module.scss";

export default function Page404({ location }) {
  return (
    <div className={styles.Page404}>
      <h1>404 Page Not Found</h1>
      <br />
      <h1>
        <span className={styles.PathName}>{location.pathname}</span> Does Not
        Exist
      </h1>
      <br />
      <Link to={"/"}>
        <h1>
          Go <span className={styles.Link}>Home</span>
        </h1>
      </Link>
    </div>
  );
}
