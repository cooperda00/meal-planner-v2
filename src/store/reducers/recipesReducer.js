const initState = {
  recipes: [],
  filter: "",
  tagFilter: "All"
};

const recipesReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_RECIPE":
      console.log("New recipe added");
      return state;
    case "CREATE_RECIPE_ERROR":
      console.log("Creat recipe error", action.err);
      return state;
    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.filter
      };
    case "CHANGE_TAG_FILTER":
      return {
        ...state,
        tagFilter: action.tagFilter
      };
    case "DELETE_RECIPE":
      console.log(`Recipe ${action.id} successfully removed`);
      return state;
    case "DELETE_RECIPE_ERROR":
      console.log(`Remove recipe ${action.id} error`, action.err);
      return state;
    case "UPDATE_RECIPE":
      console.log(`Recipe ${action.id} updated successfully`);
      return state;
    case "UPDATE_RECIPE_ERROR":
      console.log(`Recipe ${action.id} update err`, action.err);
      return state;
    default:
      return state;
  }
};

export default recipesReducer;
