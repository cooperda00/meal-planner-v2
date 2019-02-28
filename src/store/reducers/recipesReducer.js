const initState = {
  recipes: []
};

const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      console.log("New recipe added");
      return state;
    case "CREATE_RECIPE_ERROR":
      console.log("Creat recipe error", action.err);
      return state;
    //   case "REMOVE_PANTRY_ITEM":
    //     console.log(`Pantry item ${action.id} successfully removed`);
    //     return state;
    //   case "REMOVE_PANTRY_ITEM_ERROR":
    //     console.log(`Remove item ${action.id} error`, action.err);
    //     return state;
    //   case "EDIT_PANTRY_ITEM":
    //     console.log(`Pantry item ${action.id} updated successfully`);
    //     return state;
    //   case "EDIT_PANTRY_ITEM_HAVE":
    //     console.log(`Pantry item ${action.id} updated successfully`);
    //     return state;
    //   case "EDIT_PANTRY_ITEM_ERROR":
    //     console.log(`Pantry item ${action.id} update err`, action.err);
    //     return state;
    default:
      return state;
  }
};

export default recipesReducer;
