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

export { addRecipe };
