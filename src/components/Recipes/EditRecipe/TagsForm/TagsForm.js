import React from "react";
import styles from "./TagsForm.module.scss";
import uuid4 from "uuid";

export default function TagsForm(props) {
  const handleRemove = (type, e) => {
    const name = e.target.id;
    props.handleRemove(type, name);
  };

  return (
    <>
      <div className={styles.AddTagsContainer}>
        <h3>Tags:</h3>
        <ul>
          {props.tags.map(tag => (
            <li key={uuid4()}>
              {tag}{" "}
              <span
                id={tag}
                onClick={handleRemove.bind(this, "tag")}
                onKeyPress={e => {
                  if (e.key === "Enter") {
                    handleRemove("tag", e);
                  }
                }}
                className={styles.removeBtn}
                tabIndex="0"
              >
                -
              </span>
            </li>
          ))}
        </ul>

        <form onSubmit={props.handleAddTag}>
          <input
            type="text"
            name="tag"
            value={props.value}
            onChange={props.handleChangeToAdd}
            required
          />
          <input type="submit" value="Add To List" />
        </form>
      </div>
    </>
  );
}
