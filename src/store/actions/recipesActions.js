const addRecipe = (id, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("recipes")
      .add({
        userId: id,
        timeStamp: new Date().getTime(),
        ...payload
      })
      .then(() => {
        dispatch({
          type: "CREATE_RECIPE"
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_RECIPE_ERROR",
          err
        });
      });
  };
};

const changeFilter = filter => ({
  type: "CHANGE_FILTER",
  filter
});

const changeTagFilter = tagFilter => ({
  type: "CHANGE_TAG_FILTER",
  tagFilter
});

const deleteRecipe = id => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_RECIPE",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_RECIPE__ERROR",
          id,
          err
        });
      });
  };
};

const updateRecipe = (id, updates) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("recipes")
      .doc(id)
      .update({ ...updates })
      .then(() => {
        dispatch({
          type: "UPDATE_RECIPE",
          id
        });
      })
      .catch(err => {
        dispatch({
          type: "UPDATE_RECIPE__ERROR",
          id,
          err
        });
      });
  };
};

export { addRecipe, changeFilter, changeTagFilter, deleteRecipe, updateRecipe };
