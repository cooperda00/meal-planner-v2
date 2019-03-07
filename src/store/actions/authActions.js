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
      //Add dummy instruction datum to the pantry to guide users initially
      .then(() => {
        const state = getState();
        return state.firebase.auth.uid;
      })
      .then(res => {
        console.log(res);
        firestore.collection("pantry").add({
          userId: res,
          have: true,
          name: "i.e. Apples",
          per: "i.e. pack",
          price: 15,
          timeStamp: new Date().getTime()
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
