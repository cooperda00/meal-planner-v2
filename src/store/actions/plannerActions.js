export const addPlan = (userId, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const db = firestore.collection("plans").doc();
    db.set({
      id: db.id,
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

export const addMeal = (planId, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .doc(planId)
      .update({
        week: payload
      })
      .then(() => {
        dispatch({
          type: "ADD_MEAL"
        });
      })
      .catch(err => {
        dispatch({
          type: "ADD_MEAL_ERROR",
          err
        });
      });
  };
};

export const removeMeal = (planId, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .doc(planId)
      .update({
        week: payload
      })
      .then(() => {
        dispatch({
          type: "REMOVE_MEAL"
        });
      })
      .catch(err => {
        dispatch({
          type: "REMOVE_MEAL_ERROR",
          err
        });
      });
  };
};
