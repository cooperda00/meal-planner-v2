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
          <h3>Ingredients:</h3>
          <ul>
            {this.props.ingredients.map(ing => (
              <li key={uuid4()}>
                {ing.name}{" "}
                <span>
                  {ing.amount} {ing.type}
                </span>
                <span
                  id={ing.name}
                  onClick={this.handleRemove.bind(this, "ing")}
                  className={styles.removeBtn}
                >
                  -
                </span>
              </li>
            ))}
          </ul>
          <form onSubmit={this.addIngredient}>
            <input
              type="text"
              name="name"
              value={this.props.value1}
              onChange={this.props.handleChangeIngredientToAdd}
              required
              ref={input => {
                this.nameInput = input;
              }}
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
            />
            <input
              className={styles.Type}
              type="text"
              name="type"
              value={this.props.value3}
              onChange={this.props.handleChangeIngredientToAdd}
            />
            <input type="submit" value="+" />
          </form>
        </div>
      </>
    );
  }
}

export default IngredientsForm;