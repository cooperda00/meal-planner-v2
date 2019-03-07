//Modules
import React from "react";
import { Link } from "react-router-dom";
import uuid4 from "uuid";
//CSS
import styles from "./RecipeCard.module.scss";

export default function RecipeCard(props) {
  return (
    <div className={styles.CardContainer}>
      <Link to={`/recipes/${props.id}`}>
        <h1>{props.name}</h1>
      </Link>
      <img src={props.imgUrl} alt={props.name} />

      <ul className={styles.RecipeCardTags}>
        {props.tags.map(tag => {
          return <li key={uuid4()}>{tag}</li>;
        })}
      </ul>
    </div>
  );
}
