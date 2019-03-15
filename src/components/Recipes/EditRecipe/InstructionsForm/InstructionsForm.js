import React from "react";
import uuid4 from "uuid";
import styles from "./InstructionsForm.module.scss";
import Textarea from "react-textarea-autosize";

export default function InstructionsForm(props) {
  const handleRemove = (type, e) => {
    const name = e.target.id;
    props.handleRemove(type, name);
  };
  return (
    <div className={styles.AddInstructionsContainer}>
      <h3>Instructions:</h3>
      <ol>
        {props.instructions.map(ins => (
          <li key={uuid4()}>
            {ins}{" "}
            <span
              id={ins}
              onClick={handleRemove.bind(this, "ins")}
              className={styles.removeBtn}
              tabIndex="0"
              onKeyPress={e => {
                if (e.key === "Enter") {
                  handleRemove("ins", e);
                }
              }}
            >
              -
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={props.handleAddInstruction}>
        <Textarea
          className={styles.TextArea}
          name="instruction"
          value={props.value}
          onChange={props.handleChangeInstructionToAdd}
          required
        />
        <input type="submit" value="Add To List" />
      </form>
    </div>
  );
}
