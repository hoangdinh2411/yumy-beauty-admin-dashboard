import React from "react";
import styles from "./select.module.css";
function Select({ options, handleChange }) {
  return (
    <>
      <select
        id={options.title}
        onChange={(e) => handleChange(e)}
      >
        <option className={styles.title} label={options.title} >
        </option>
        {options.options.map((option) => {
          return (
            <option key={option.id}  value={option.value}>
              {option.value}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default React.memo(Select);
