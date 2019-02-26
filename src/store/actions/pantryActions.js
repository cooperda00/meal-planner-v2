const addPantryItem = () => ({
  type: "CREATE_PANTRY_ITEM"
});

const removePantryItem = id => ({
  type: "REMOVE_PANTRY_ITEM",
  id
});

const editPantryItem = (id, newItem) => ({
  type: "EDIT_PANTRY_ITEM",
  id,
  newItem
});

export { addPantryItem, removePantryItem, editPantryItem };
