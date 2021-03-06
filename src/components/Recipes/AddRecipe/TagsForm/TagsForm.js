//Modules
import React from "react";
import uuid4 from "uuid";
//Sass
import styles from "./TagsForm.module.scss";

class TagsForm extends React.Component {
  addTag = e => {
    e.preventDefault();
    this.props.handleAddTag(e);
    this.nameInput.focus();
  };

  handleRemove = (type, e) => {
    const name = e.target.id;
    this.props.handleRemove(type, name);
  };

  render() {
    return (
      <>
        <div className={styles.AddTagsContainer}>
          <h3>
            {" "}
            <span className={styles.Manditory}>* </span>Tags:
          </h3>
          <ul>
            {this.props.tags.map(tag => (
              <li key={uuid4()}>
                {tag}{" "}
                <span
                  id={tag}
                  onClick={this.handleRemove.bind(this, "tag")}
                  className={styles.removeBtn}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.handleRemove("tag", e);
                    }
                  }}
                  tabIndex="0"
                >
                  -
                </span>
              </li>
            ))}
          </ul>

          <form onSubmit={this.addTag}>
            <input
              className={styles.AddTagInput}
              type="text"
              name="tag"
              value={this.props.value}
              onChange={this.props.handleChangeToAdd}
              required
              ref={input => {
                this.nameInput = input;
              }}
              placeholder="Gluten-free"
            />
            <input type="submit" value="Add To List" />
          </form>
        </div>
      </>
    );
  }
}

export default TagsForm;
