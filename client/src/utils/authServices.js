import { showSuccessMessageAlert, showErrorMessageAlert } from "utils/services";
import authAPI from "api/axios/authAPI";

const signInSuccess = (data, dispatch, navigate) => {
  localStorage.setItem("authInfo", JSON.stringify(data));
  navigate("/");
  showSuccessMessageAlert("Welcome", dispatch);
};

export const signUp = (formData, dispatch, navigate) => {
  authAPI
    .adminSignUp(formData)
    .then((data) => {
      signInSuccess(data, dispatch, navigate);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};

export const signInByUserName = (formData, dispatch, navigate) => {
  authAPI
    .adminSignIn(formData)
    .then((data) => {
      signInSuccess(data, dispatch, navigate);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};

export const signOut = (dispatch, navigate) => {
  localStorage.removeItem("authInfo");
  showSuccessMessageAlert("See you again", dispatch);
  navigate("/signin");
};

export const updateProfile = (userId, newData, dispatch) => {
  authAPI
    .updateProfile(userId, newData)
    .then((data) => {
      
      const auth= {
        result : data,
        token : JSON.parse(localStorage.getItem('authInfo')).token
      }
      localStorage.setItem("authInfo", JSON.stringify(auth));
      showSuccessMessageAlert("Updated successfully", dispatch);
    })
    .catch((err) => {
      showErrorMessageAlert(err, dispatch);
    });
};
