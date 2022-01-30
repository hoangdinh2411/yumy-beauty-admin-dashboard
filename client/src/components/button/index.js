import styles from "./button.module.css";
function Button({ type,children,handleClick , variant,disable }) {
  return <button disabled={disable} className={`${styles.button} ${variant}`} type={type} onClick={handleClick}>{children}</button>;
}

export default Button;
