const initState = {
  plans: []
};

const plannerReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PLAN":
      console.log("New plan added");
      return state;
    case "CREATE_PLAN_ERROR":
      console.log("Create plan error", action.err);
      return state;
    case "ADD_MEAL":
      console.log("New meal added");
      return state;
    case "ADD_MEAL_ERROR":
      console.log("Add meal error", action.err);
      return state;
    // case "DELETE_RECIPE":
    //   console.log(`Recipe ${action.id} successfully removed`);
    //   return state;
    // case "DELETE_RECIPE_ERROR":
    //   console.log(`Remove recipe ${action.id} error`, action.err);
    //   return state;
    // case "UPDATE_RECIPE":
    //   console.log(`Recipe ${action.id} updated successfully`);
    //   return state;
    // case "UPDATE_RECIPE_ERROR":
    //   console.log(`Recipe ${action.id} update err`, action.err);
    //   return state;
    default:
      return state;
  }
};
