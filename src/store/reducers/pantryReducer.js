import uuid4 from "uuid";

const initState = {
  pantry: [
    {
      have: false,
      name: "Rice",
      per: "cup",
      price: 10,
      id: uuid4()
    },

    {
      have: true,
      name: "bread",
      per: "slice",
      price: 15,
      id: uuid4()
    },

    {
      have: false,
      name: "Syrup",
      per: "tbsp",
      price: 5,
      id: uuid4()
    }
  ]
};

const pantryReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PANTRY_ITEM":
      return {
        ...state,
        pantry: [
          ...state.pantry,
          {
            have: false,
            name: "...",
            per: "...",
            price: 0,
            id: uuid4()
          }
        ]
      };

    case "REMOVE_PANTRY_ITEM":
      const newPantry = state.pantry.filter(item => item.id !== action.id);
      return {
        ...state,
        pantry: [...newPantry]
      };

    case "EDIT_PANTRY_ITEM":
      return {
        ...state,
        pantry: [...action.newItem]
      };

    case "CREATE_PANTRY_ITEM_ERROR":
      console.log("create pantry item error", action.err);
      break;
    default:
      return state;
  }
};

export default pantryReducer;
