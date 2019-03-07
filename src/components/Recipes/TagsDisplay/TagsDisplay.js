import React from "react";
import uuid4 from "uuid";
import styles from "./TagsDisplay.module.scss";
import { connect } from "react-redux";
import { changeTagFilter } from "../../../store/actions/recipesActions";
import Spinner from "../../Spinner/Spinner";

function TagsDisplay(props) {
  const handleClick = e => {
    props.changeTagFilter(e.target.innerHTML);
  };

  const tags =
    props.tags.length > 0 ? (
      <>
        <li className={styles.Tag} onClick={handleClick}>
          All
        </li>
        {props.tags.map(tag => {
          if (tag) {
            return (
              <li className={styles.Tag} onClick={handleClick} key={uuid4()}>
                {tag}
              </li>
            );
          }
        })}
      </>
    ) : (
      <Spinner />
    );

  return <ul className={styles.TagsContainer}>{tags}</ul>;
}

const mapDispatchToProps = dispatch => {
  return {
    changeTagFilter: tagFilter => {
      dispatch(changeTagFilter(tagFilter));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(TagsDisplay);
