import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FileBase from "react-file-base64";
import { Button, Input } from "components";
import styles from "./profile.module.css";
import RouterPrompt from "hooks/routerPrompt";
const profileInputStyle = {
  width: 600,
  marginBottom: 50,
};
function Profile({auth}) {
  const location = useLocation();
  const userInfo = auth?.result;
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [fields, setFields] = useState({
    username: userInfo?.username,
    fullName: userInfo?.fullName,
    phone: userInfo?.phone,
    email: userInfo?.email,
  });

  const handleChange = (e) => {
    const field = e.target.name;
    setFields({
      [field]: e.target.value,
    });
  };

  RouterPrompt({
    when:
      fields.username !== userInfo?.username ||
      fields.fullName !== userInfo?.fullName ||
      fields.phone !== userInfo?.phone ||
      fields.email !== userInfo?.email ||
      avatar !== "",

    message: "Are you sure you want to leave? "  
  });

  const handleSelectAvatar = ({ base64 }) => {
    setAvatar(base64);
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="wrapper__heading">
        <h3 className="pageTitle">{location.state}</h3>
      </div>
      <form
        noValidate
        onSubmit={handleEditProfile}
        className="content profile "
      >
        <div className={styles.avatarContainer}>
          <img src={auth?.result?.avatar} className={styles.avatar} alt="" />
          <FileBase type="file" multiple={false} onDone={handleSelectAvatar} />
        </div>

        <Input
          type="text"
          showErrorMessage
          wasSubmitted={wasSubmitted}
          name="fullName"
          handleChange={handleChange}
          value={fields.fullName || ""}
          sx={profileInputStyle}
          title="Full Name"
        />
        <Input
          type="text"
          showErrorMessage
          wasSubmitted={wasSubmitted}
          name="username"
          handleChange={handleChange}
          value={fields.username || ""}
          sx={profileInputStyle}
          title="Username"
        />
        <Input
          type="phone"
          showErrorMessage
          wasSubmitted={wasSubmitted}
          name="phone"
          handleChange={handleChange}
          value={fields.phone || ""}
          sx={profileInputStyle}
          title="Phone"
        />
        <Input
          type="email"
          showErrorMessage
          wasSubmitted={wasSubmitted}
          name="email"
          handleChange={handleChange}
          value={fields.email || ""}
          sx={profileInputStyle}
          title="Email"
        />
      </form>
      <div className={styles.buttons}>
        <span></span>
        <Button>Edit</Button>
      </div>
    </>
  );
}

export default Profile;
