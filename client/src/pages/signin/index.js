import { useState } from "react";
import styles from "./signinPage.module.css";
import { Input, Button } from "components";
import { formFields } from "constants";
import authThunks from "store/user/authThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFieldError, getFormData } from "utils/services";

function Signin() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const handleChange = (e) => {
  //   setValue({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData(e);

    const formIsValid = Object.values(formData).every(
      (value) => !getFieldError(value)
    );
    setWasSubmitted(true);
    if (formIsValid) {
      if (isSignIn) {
        dispatch(authThunks.signInByUserName(formData, navigate));
      } else {
        dispatch(authThunks.signUp(formData, navigate));
      }
      e.currentTarget.reset()
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const resetForm = () => {
    setShowPass(false);
   
  };

  const handleCancel = () => {
    if (sendEmail) {
      setSendEmail(!sendEmail);
      setIsSignIn((prev) => prev);
      resetForm();
    } else {
      resetForm();
      setIsSignIn((prev) => prev);
    }
  };

  const handleSwitchForm = () => {
    if (sendEmail) {
      setSendEmail(!sendEmail);
      setIsSignIn(false);
      resetForm();
    } else {
      resetForm();
      setIsSignIn(!isSignIn);
    }
  };

  const handleResetPass = () => {
    if (sendEmail) {
      setSendEmail(false);
      setIsSignIn(true);
    } else {
      setSendEmail(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.heading}>
        {sendEmail ? "Forget Pass" : isSignIn ? "Sign in" : "Sign up"}
      </h1>

      {
        //If user click forgot pass, show send email form
        (sendEmail && (
          <>
            <Input
              wasSubmitted={wasSubmitted}
              // value={formData.email}
              name="email"
              type="email"
              title="Email"
              
            />
          </>
        )) ||
          //or come back sign in form
          //Change between sign in and sign up form
          (isSignIn && (
            <>
              {formFields.signInForm.map((field) => {
                return (
                  <Input
                    
                    wasSubmitted={wasSubmitted}
                    id={field.name}
                    handleShowPass={
                      field.name === "password" ? handleShowPass : null
                    }
                    key={field.id}
                    // value={formData[field.name] || ""}
                    icon={
                      field.name === "password"
                        ? field.icon[showPass ? "show" : "hide"]
                        : null
                    }
                    name={field.name}
                    type={
                      field.name === "password"
                        ? field.type[showPass ? "show" : "hide"]
                        : field.type
                    }
                    title={field.title}
                  />
                );
              })}
            </>
          )) || (
            <>
              {formFields.signUpForm.map((field) => {
                return (
                  <Input
                    
                    wasSubmitted={wasSubmitted}
                    id={field.name}
                    handleShowPass={
                      field.name === "password" ? handleShowPass : null
                    }
                    key={field.id}
                    // value={formData[field.name] || ""}
                    icon={
                      field.name === "password"
                        ? field.icon[showPass ? "show" : "hide"]
                        : null
                    }
                    name={field.name}
                    type={
                      field.name === "password"
                        ? field.type[showPass ? "show" : "hide"]
                        : field.type
                    }
                    title={field.title}
                  />
                );
              })}
            </>
          )
      }
      <div className={styles.button}>
        <Button handleClick={handleCancel} type="button">
          {sendEmail ? "Back " : "Reset"}
        </Button>
        <Button type="submit">
          {sendEmail ? "Send" : isSignIn ? "Sign In" : "Register"}
        </Button>
      </div>
      <p className={styles.changeForm} onClick={handleSwitchForm}>
        {isSignIn || sendEmail
          ? "Don't have account? Register here "
          : "Already have a account? Sign in now"}
      </p>
      <p className={styles.resetPassword} onClick={handleResetPass}>
        {!sendEmail
          ? " Forget password"
          : "Already have a account? Sign in now"}
      </p>
    </form>
  );
}

export default Signin;
