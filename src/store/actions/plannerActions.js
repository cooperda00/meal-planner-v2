export const addPlan = (userId, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .add({
        userId: userId,
        timeStamp: new Date().getTime(),
        ...payload
      })
      .then(() => {
        dispatch({
          type: "CREATE_PLAN"
        });
      })
      .catch(err => {
        dispatch({
          type: "CREATE_PLAN_ERROR",
          err
        });
      });
  };
};
