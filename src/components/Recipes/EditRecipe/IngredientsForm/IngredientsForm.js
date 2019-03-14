import React from "react";
import styles from "./IngredientsForm.module.scss";
import uuid4 from "uuid";

export default function IngredientsForm(props) {
  const handleRemove = (type, e) => {
    const name = e.target.id;
    props.handleRemove(type, name);
  };

  return (
    <>
      <div className={styles.AddIngredientsContainer}>
        <h3>Ingredients:</h3>
        <ul>
          {props.ingredients.map(ing => (
            <li key={uuid4()}>
              {ing.name}{" "}
              <span>
                {ing.amount} {ing.type}
              </span>
              <span
                id={ing.name}
                onClick={handleRemove.bind(this, "ing")}
                className={styles.removeBtn}
              >
                -
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={props.handleAddIngredient}>
          <input
            type="text"
            name="name"
            value={props.value1}
            onChange={props.handleChangeIngredientToAdd}
            required
          />
          <input
            className={styles.Num}
            type="number"
            name="amount"
            value={props.value2}
            onChange={props.handleChangeIngredientToAdd}
            required
          />
          <input
            className={styles.Type}
            type="text"
            name="type"
            value={props.value3}
            onChange={props.handleChangeIngredientToAdd}
          />
          <input type="submit" value="Add To List" />
        </form>
      </div>
    </>
  );
}
