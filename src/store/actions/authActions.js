export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch({ type: "LOGIN_ATTEMPT", isFetching: true });
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS", isFetching: false });
      })
      .catch(err => {
        dispatch({
          type: "LOGIN_ERROR",
          err,
          isFetching: false
        });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      })
      .catch(err => {
        dispatch({
          type: "SIGNOUT_ERROR",
          err
        });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "SIGNUP_ATTEMPT", isFetching: true });
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            email: newUser.email,
            initials: newUser.initials
          });
      })

      .then(() => {
        const state = getState();
        return state.firebase.auth.uid;
      })
      .then(res => {
        //Add Initial Plan
        const db = firestore.collection("plans").doc();
        db.set({
          planName: "untitled",
          id: db.id,
          userId: res,
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
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS", isFetching: false });
      })
      .catch(err => {
        dispatch({
          type: "SIGNUP_ERROR",
          err,
          isFetching: false
        });
      });
  };
};
