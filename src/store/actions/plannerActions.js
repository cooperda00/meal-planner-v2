export const addPlan = userId => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const db = firestore.collection("plans").doc();
    db.set({
      planName: "untitled",
      id: db.id,
      userId: userId,
      timeStamp: new Date().getTime(),
      week: [
        {
          day: 1,
          meals: []
        },
        {
          day: 2,
          meals: []
        },
        {
          day: 3,
          meals: []
        },
        {
          day: 4,
          meals: []
        },
        {
          day: 5,
          meals: []
        },
        {
          day: 6,
          meals: []
        },
        {
          day: 7,
          meals: []
        }
      ]
    })
      .then(() => {
        dispatch({
          type: "CREATE_PLAN"
        });
      })
      .then(() => {
        dispatch({
          type: "CHANGE_SELECTED_PLAN",
          planId: db.id
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
    const state = getState();
    console.log(state.firebase.auth.uid);
    firestore
      .collection("plans")
      .where("userId", "==", state.firebase.auth.uid)
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

export const updatePlanName = (planId, payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("plans")
      .doc(planId)
      .update({
        planName: payload
      })
      .then(() => {
        dispatch({
          type: "UPDATE_PLAN_NAME"
        });
      })
      .catch(err => {
        dispatch({
          type: "UPDATE_PLAN_NAME_ERROR",
          err
        });
      });
  };
};

export const toggleBackdrop = () => {
  return {
    type: "TOGGLE_BACKDROP"
  };
};
