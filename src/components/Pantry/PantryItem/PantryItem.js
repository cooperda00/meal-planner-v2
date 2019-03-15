//Modules
import React from "react";
import AutosizeInput from "react-input-autosize";
//Styles
import styles from "./PantryItem.module.scss";
//Redux
import { connect } from "react-redux";
import { addPantryItem } from "../../../store/actions/pantryActions";

function PantryItem({
  editIngredient,
  editIngredientCheckbox,
  deleteIngredient,
  ing,
  uid,
  addPantryItem
}) {
  const { name, price, per, have, id, userId } = ing;

  //Apply conditional underlines
  let nameClass = `${styles.PantryItemName}`;
  if (name === "") {
    nameClass = `${styles.PantryItemName} ${styles.Underline}`;
  }
  let priceClass = `${styles.PantryItemSmall}`;
  if (price === 0) {
    priceClass = `${styles.PantryItemSmall} ${styles.Underline}`;
  }
  let typeClass = `${styles.PantryItemSmall}`;
  if (per === "") {
    typeClass = `${styles.PantryItemSmall} ${styles.Underline}`;
  }

  const handleEditIngredient = e => {
    editIngredient(id, e.target.id, e.target.value, e.target.checked);
  };

  const handleEditIngredientCheckbox = e => {
    editIngredientCheckbox(id);
  };

  const handleDelete = () => {
    deleteIngredient(id);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      addPantryItem(uid);
    }
  };

  let placeholder = "Bottle";

  if (name && price) {
    placeholder = "";
  }

  //Only Displays Data Created By The User
  if (userId === uid) {
    return (
      <div className={styles.PantryItem}>
        <AutosizeInput
          id="name"
          type="text"
          value={name}
          onChange={handleEditIngredient}
          className={nameClass}
          placeholder="Soy Sauce"
        />
        <span>฿</span>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={handleEditIngredient}
          className={priceClass}
          placeholder="25"
          onKeyPress={handleKeyPress}
        />
        <span>per</span>
        <input
          id="per"
          type="text"
          value={per}
          onChange={handleEditIngredient}
          className={typeClass}
          placeholder={placeholder}
          onKeyPress={handleKeyPress}
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

const mapDispatchToProps = dispatch => {
  return {
    addPantryItem: uid => {
      dispatch(addPantryItem(uid));
    }
  };
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PantryItem);
