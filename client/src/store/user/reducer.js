import { actionTypes } from "./actions";
const initialState = {
  authData: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SIGN_IN_BY_USERNAME:
      localStorage.setItem("authInfo", JSON.stringify(payload));
      return {
        authData: payload,
      };
    case actionTypes.SIGN_OUT:
      localStorage.removeItem("authInfo");
      return {
        authData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
