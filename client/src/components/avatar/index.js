import React, { useState, useEffect } from "react";
import styles from "./avatar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import authActions from "store/user/actions";
import messageAction from "store/message/actions";
import decode from "jwt-decode";

function UserAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authInfo"))
  );


  //Kiem tra, neu token het han , thi se tu dong log out
  useEffect(() => {
    const token = user?.token;
    if (token) {
      //ma hoa token
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(authActions.signout());
        dispatch(messageAction.addMessage("See you again"));
        navigate("/signin");
      }
    }
    setUser(JSON.parse(localStorage.getItem("authInfo")));
  }, [navigate]);



  const handleSignOut = () => {
    dispatch(authActions.signout());
    dispatch(messageAction.addMessage({ info: "See you again" }));
    navigate("/signin");
  };
  return (
    <div className={styles.wrapper}>
      {user.result?.avatarURL ? (
        <img src={user.result?.avatarURL} className={styles.avatar} alt="Avatar" />
      ) : (
        <p className={styles.avatarByCharacter}>
          {user.result?.fullName.charAt(0).toUpperCase()}
        </p>
      )}
      <ul className={styles.subMenu}>
        <li className={styles.items}>
          <FaEdit />
          <Link to="/profile" className={styles.link}>
            Edit Profile
          </Link>
        </li>
        <li className={styles.items} onClick={handleSignOut}>
          <FaSignOutAlt />
          <span className={styles.link}>Sign Out</span>
        </li>
      </ul>
    </div>
  );
}

export default UserAvatar;
