import authAPI from "api/authAPI";
import authActions from "./actions";
import messageAction from "../message/actions";
const authThunks = {
  signUp: (formData, navigate) => {
    return (dispatch) => {
      return authAPI
        .adminSignUp(formData)
        .then((data) => {
          dispatch(authActions.signIn(data));
          const message = { success: "Successfully" };
          dispatch(messageAction.addMessage(message));

          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            const errMessage = err.response.data.message;
            dispatch(messageAction.addMessage(errMessage));
          }
        });
    };
  },
  signInByUserName: (formData, navigate) => {
    return (dispatch) => {
      return authAPI
        .adminSignIn(formData)
        .then((data) => {
          dispatch(authActions.signIn(data))
          const message = { success: "Successfully" };
          dispatch(messageAction.addMessage(message));
          navigate('/')
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            const errMessage = err.response.data.message;
            dispatch(messageAction.addMessage(errMessage));
          }
        });
    };
  },
};

export default authThunks;
