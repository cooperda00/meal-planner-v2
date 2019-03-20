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
                tabIndex="0"
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    handleRemove("ing", e);
                  }
                }}
              >
                -
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={props.handleAddIngredient} className={styles.Form}>
          <input
            type="text"
            name="name"
            value={props.value1}
            onChange={props.handleChangeIngredientToAdd}
            required
            placeholder="Soy Sauce"
          />
          <input
            className={styles.Num}
            type="number"
            name="amount"
            value={props.value2}
            onChange={props.handleChangeIngredientToAdd}
            required
            placeholder={2}
          />
          <input
            className={styles.Type}
            type="text"
            name="type"
            value={props.value3}
            onChange={props.handleChangeIngredientToAdd}
            placeholder="tbsp"
          />
          <input type="submit" value="Add To List" />
        </form>
      </div>
    </>
  );
}
