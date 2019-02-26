const addPantryItem = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("pantry")
      .add({
        have: false,
        name: "",
        per: "",
        price: 0,
        timeStamp: new Date().getTime()
      })
      .then(() => {
        dispatch({
          type: "CREATE_PANTRY_ITEM"
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_PANTRY_ITEM_ERROR",
          err
        });
      });
  };
};

const removePantryItem = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("pantry")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: "REMOVE_PANTRY_ITEM",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "REMOVE_PANTRY_ITEM_ERR",
          id,
          err
        });
      });
  };
};

const editPantryItem = (id, newItem) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("pantry")
      .doc(id)
      .update(newItem)
      .then(() => {
        dispatch({
          type: "EDIT_PANTRY_ITEM",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "EDIT_PANTRY_ITEM_ERROR",
          id,
          err
        });
      });
  };
};

const editIngredientCheckbox = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //Get inital value for "have"
    const have = getState().firestore.ordered.pantry.filter(
      item => item.id === id
    )[0].have;

    const firestore = getFirestore();
    firestore
      .collection("pantry")
      .doc(id)
      .update({
        //Update to be opposite
        have: !have
      })
      .then(() => {
        dispatch({
          type: "EDIT_PANTRY_ITEM_HAVE",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "EDIT_PANTRY_ITEM_ERROR",
          id,
          err
        });
      });
  };
};

export {
  addPantryItem,
  removePantryItem,
  editPantryItem,
  editIngredientCheckbox
};
