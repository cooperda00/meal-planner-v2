const initState = {
  pantry: []
};

const pantryReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PANTRY_ITEM":
      console.log("New item added");
      return state;
    case "CREATE_PANTRY_ITEM_ERROR":
      console.log("Creat item error", action.err);
      return state;
    case "REMOVE_PANTRY_ITEM":
      console.log(`Pantry item ${action.id} successfully removed`);
      return state;
    case "REMOVE_PANTRY_ITEM_ERROR":
      console.log(`Remove item ${action.id} error`, action.err);
      return state;
    case "EDIT_PANTRY_ITEM":
      console.log(`Pantry item ${action.id} updated successfully`);
      return state;
    case "EDIT_PANTRY_ITEM_HAVE":
      console.log(`Pantry item ${action.id} updated successfully`);
      return state;
    case "EDIT_PANTRY_ITEM_ERROR":
      console.log(`Pantry item ${action.id} update err`, action.err);
      return state;
    default:
      return state;
  }
};

export default pantryReducer;
