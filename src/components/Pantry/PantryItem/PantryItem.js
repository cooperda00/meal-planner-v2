//Modules
import React from "react";
//Styles
import styles from "./PantryItem.module.scss";

export default function PantryItem({
  editIngredient,
  editIngredientCheckbox,
  deleteIngredient,
  ing
}) {
  const { name, price, per, have, id } = ing;

  const handleEditIngredient = e => {
    editIngredient(id, e.target.id, e.target.value, e.target.checked);
  };

  const handleEditIngredientCheckbox = e => {
    editIngredientCheckbox(id);
  };

  const handleDelete = () => {
    deleteIngredient(id);
  };

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
}
