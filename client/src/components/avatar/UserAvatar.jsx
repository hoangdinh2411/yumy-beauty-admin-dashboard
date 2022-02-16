import React, { useState } from "react";
import styles from "./avatar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signOut } from "utils/services";

function UserAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("authInfo"));

  const handleSignOut = () => {
    signOut(dispatch, navigate);
  };
  return (
    <div className={styles.wrapper}>
      {user.result?.avatarURL ? (
        <img
          src={user.result?.avatarURL}
          className={styles.avatar}
          alt="Avatar"
        />
      ) : (
        <p className={styles.avatarByCharacter}>
          {user.result?.fullName.charAt(0).toUpperCase()}
        </p>
      )}
      <ul className={styles.subMenu}>
        <li className={styles.items}>
          <FaEdit />
          <NavLink to="/profile" state="Profile" className={styles.link}>
            Edit Profile
          </NavLink>
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
