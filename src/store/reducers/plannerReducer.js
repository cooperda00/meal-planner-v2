const initState = {
  plans: [],
  selectedPlan: ""
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
    case "REMOVE_MEAL":
      console.log("Meal Removed");
      return state;
    case "REMOVE_MEAL_ERROR":
      console.log("Remove meal error", action.err);
      return state;
    case "CHANGE_SELECTED_PLAN":
      console.log(`Changed selected plan to ${action.planId}`);
      return {
        ...state,
        selectedPlan: action.planId
      };
    case "SET_DEFAULT_PLAN":
      console.log("Default plan added");
      return {
        ...state,
        selectedPlan: action.planId
      };
    case "SET_DEFAULT_PLAN_ERROR":
      console.log("Set default plan error", action.err);
      return state;
    case "DELETE_PLAN":
      console.log("Plan Removed");
      return state;
    case "DELETE_PLAN_ERROR":
      console.log("Delete plan error", action.err);
      return state;
    case "UPDATE_PLAN_NAME":
      console.log("Updating plan name");
      return state;
    case "UPDATE_PLAN_NAME_ERROR":
      console.log("Error updating plan name", action.err);
      return state;
    default:
      return state;
  }
};

export default plannerReducer;
