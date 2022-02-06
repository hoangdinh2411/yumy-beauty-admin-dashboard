import authAPI from "api/axios/authAPI";
import authActions from "./actions";
import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";

const authThunks = {
  signUp: (formData, navigate) => {
    return (dispatch) => {
      return authAPI
        .adminSignUp(formData)
        .then((data) => {
          dispatch(authActions.signIn(data));
          showSuccessMessageAlert("Sign Up", dispatch);

          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            showErrorMessageAlert(err);
          }
        });
    };
  },
  signInByUserName: (formData, navigate) => {
    return (dispatch) => {
      return authAPI
        .adminSignIn(formData)
        .then((data) => {
          dispatch(authActions.signIn(data));
          showSuccessMessageAlert("Welcome back", dispatch);
          navigate("/");
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            showErrorMessageAlert(err);
          }
        });
    };
  },
  signOut: (dispatch, navigate) => {
    dispatch(authActions.signout());
    showSuccessMessageAlert("See you again", dispatch);
    navigate("/signin");
  },
};

export default authThunks;
