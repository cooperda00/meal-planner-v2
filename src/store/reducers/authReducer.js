const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    // LOGIN ----------------------------
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return {
        ...state,
        authError: null
      };
    case "LOGIN_ERROR":
      console.log("Login Error");
      return {
        ...state,
        authError: "Login Failed"
      };

    // SIGNOUT ----------------------------
    case "SIGNOUT_SUCCESS":
      console.log("Signout Success");
      return state;
    case "SIGNOUT_ERROR":
      console.log("Signout Error");
      return state;

    default:
      return state;
  }
};

export default authReducer;
