import React from "react";
import uuid4 from "uuid";
import styles from "./InstructionsForm.module.scss";

class InstructionsForm extends React.Component {
  addInstruction = e => {
    e.preventDefault();
    this.props.handleAddInstruction(e);
    this.nameInput.focus();
  };

  handleRemove = (type, e) => {
    const name = e.target.id;
    this.props.handleRemove(type, name);
  };

  render() {
    return (
      <div className={styles.AddInstructionsContainer}>
        <h3>Instructions:</h3>
        <ol>
          {this.props.instructions.map(ins => (
            <li key={uuid4()}>
              {ins}{" "}
              <span
                id={ins}
                onClick={this.handleRemove.bind(this, "ins")}
                className={styles.removeBtn}
              >
                -
              </span>
            </li>
          ))}
        </ol>

        <form onSubmit={this.addInstruction}>
          <input
            type="text"
            name="instruction"
            value={this.props.value}
            onChange={this.props.handleChangeInstructionToAdd}
            required
            ref={input => {
              this.nameInput = input;
            }}
            className={styles.TextInput}
            placeholder="Boil pasta for 11 minutes"
          />
          <input type="submit" value="Add To List" />
        </form>
      </div>
    );
  }
}

export default InstructionsForm;
