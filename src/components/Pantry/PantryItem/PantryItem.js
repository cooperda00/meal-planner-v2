//Modules
import React from "react";
//Styles
import styles from "./PantryItem.module.scss";
//Redux
import { connect } from "react-redux";

function PantryItem({
  editIngredient,
  editIngredientCheckbox,
  deleteIngredient,
  ing,
  uid
}) {
  const { name, price, per, have, id, userId } = ing;

  const handleEditIngredient = e => {
    editIngredient(id, e.target.id, e.target.value, e.target.checked);
  };

  const handleEditIngredientCheckbox = e => {
    editIngredientCheckbox(id);
  };

  const handleDelete = () => {
    deleteIngredient(id);
  };

  //Only Displays Data Created By The User
  if (userId === uid) {
    return (
      <div className={styles.PantryItem}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleEditIngredient}
          className={styles.PantryItemName}
        />
        <span>฿</span>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={handleEditIngredient}
          className={styles.PantryItemSmall}
        />
        <span>per</span>
        <input
          id="per"
          type="text"
          value={per}
          onChange={handleEditIngredient}
          className={styles.PantryItemSmall}
        />
        <input
          id="have"
          type="checkbox"
          checked={have}
          onChange={handleEditIngredientCheckbox}
          className={styles.PantryItemSmall}
        />
        <button className={styles.PantryItemDeleteBtn} onClick={handleDelete}>
          X
        </button>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

export default connect(mapStateToProps)(PantryItem);
