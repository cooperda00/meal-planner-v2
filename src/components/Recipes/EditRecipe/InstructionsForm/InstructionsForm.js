import React from "react";
import uuid4 from "uuid";
import styles from "./InstructionsForm.module.scss";

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
            >
              -
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={props.handleAddInstruction}>
        <textarea
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
