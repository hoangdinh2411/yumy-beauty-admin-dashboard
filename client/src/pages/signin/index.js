import { useState } from "react";
import styles from "./signinPage.module.css";
import { Input, Button } from "components";
import { formFields } from "constants";
import authThunks from "store/user/authThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [formData, setFormData] = useState({});
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      dispatch(authThunks.signInByUserName(formData, navigate));
    } else {
      dispatch(authThunks.signUp(formData, navigate));
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const resetForm = () => {
    setShowPass(false);
    setFormData({});
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.heading}>
        {sendEmail ? "Forget Pass" : isSignIn ? "Sign in" : "Sign up"}
      </h1>

      {
        //If user click forgot pass, show send email form
        (sendEmail && (
          <>
            <Input
              sx={{ marginBottom: "16px" }}
              value={formData.email}
              underline
              handleChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
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
                    sx={{ marginBottom: "16px" }}
                    underline
                    id={field.name}
                    handleShowPass={
                      field.name === "password" ? handleShowPass : null
                    }
                    key={field.id}
                    value={formData[field.name] || ""}
                    handleChange={handleChange}
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
                    placeholder={field.placeholder}
                  />
                );
              })}
            </>
          )) || (
            <>
              {formFields.signUpForm.map((field) => {
                return (
                  <Input
                    sx={{ marginBottom: "16px" }}
                    underline
                    id={field.name}
                    handleShowPass={
                      field.name === "password" ? handleShowPass : null
                    }
                    key={field.id}
                    value={formData[field.name] || ""}
                    handleChange={handleChange}
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
                    placeholder={field.placeholder}
                  />
                );
              })}
            </>
          )
      }
      <div className={styles.button}>
        <Button handleClick={handleCancel}>
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
