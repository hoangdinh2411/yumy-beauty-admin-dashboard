import React from "react";
import styles from "./input.module.css";
function Input({
  id,
  icon,
  name,
  type,
  value,
  handleChange,
  placeholder,
  handleShowPass,
  underline,
  sx,
  title
}) {
  return (
    <div className={styles.boxes} style={sx}>
      <span className={styles.icon} onClick={handleShowPass}>
        {icon}
      </span>
      <span className={styles.title}>{title}</span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        className={styles.input}
        required
      />
      {(underline && <p className={styles.line}></p>) || null}
    </div>
  );
}

export default Input;
