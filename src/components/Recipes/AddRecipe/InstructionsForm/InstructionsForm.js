//Modules
import React from "react";
import uuid4 from "uuid";
import AutosizeInput from "react-input-autosize";
//Sass
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
        <h3>
          {" "}
          <span className={styles.Manditory}>* </span>Instructions:
        </h3>
        <ol>
          {this.props.instructions.map(ins => (
            <li key={uuid4()}>
              {ins}{" "}
              <span
                id={ins}
                onClick={this.handleRemove.bind(this, "ins")}
                className={styles.removeBtn}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    this.handleRemove("ins", e);
                  }
                }}
                tabIndex="0"
              >
                -
              </span>
            </li>
          ))}
        </ol>

        <form onSubmit={this.addInstruction} className={styles.Form}>
          <AutosizeInput
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
