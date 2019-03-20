import React from "react";
import styles from "./IngredientsForm.module.scss";
import uuid4 from "uuid";

class IngredientsForm extends React.Component {
  addIngredient = e => {
    e.preventDefault();
    this.props.handleAddIngredient(e);
    this.nameInput.focus();
  };

  handleRemove = (type, e) => {
    const name = e.target.id;
    this.props.handleRemove(type, name);
  };

  render() {
    return (
      <>
        <div className={styles.AddIngredientsContainer}>
          <h3>
            <span className={styles.Manditory}>* </span>Ingredients:
          </h3>
          <ul>
            {this.props.ingredients.map(ing => (
              <li key={uuid4()} className={styles.Bullet}>
                {ing.name}{" "}
                <span>
                  {ing.amount} {ing.type}
                </span>
                <span
                  id={ing.name}
                  onClick={this.handleRemove.bind(this, "ing")}
                  className={styles.removeBtn}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.handleRemove("ing", e);
                    }
                  }}
                  tabIndex="0"
                >
                  -
                </span>
              </li>
            ))}
          </ul>
          <form onSubmit={this.addIngredient} className={styles.Form}>
            <input
              type="text"
              name="name"
              value={this.props.value1}
              onChange={this.props.handleChangeIngredientToAdd}
              required
              ref={input => {
                this.nameInput = input;
              }}
              placeholder="Rice pasta"
            />
            <input
              className={styles.Num}
              type="number"
              name="amount"
              min="0"
              step="0.1"
              value={this.props.value2}
              onChange={this.props.handleChangeIngredientToAdd}
              required
              placeholder="1"
            />
            <input
              className={styles.Type}
              type="text"
              name="type"
              value={this.props.value3}
              onChange={this.props.handleChangeIngredientToAdd}
              placeholder="Cup"
            />
            <input type="submit" value="Add To List" />
          </form>
        </div>
      </>
    );
  }
}

export default IngredientsForm;
