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

export const setDefaultPlan = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .orderBy("timeStamp", "desc")
      .limit(1)
      .get()
      .then(res => {
        let id = "";
        res.forEach(doc => {
          id = doc.id;
        });
        dispatch({
          type: "SET_DEFAULT_PLAN",
          planId: id
        });
      })
      .catch(err => {
        dispatch({
          type: "SET_DEFAULT_PLAN_ERROR",
          err
        });
      });
  };
};

export const changeSelectedPlan = planId => {
  return dispatch => {
    dispatch({
      type: "CHANGE_SELECTED_PLAN",
      planId
    });
  };
};

export const deletePlan = planId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .doc(planId)
      .delete()
      .then(() => {
        dispatch({
          type: "DELETE_PLAN"
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_PLAN_ERROR",
          err
        });
      });
  };
};
