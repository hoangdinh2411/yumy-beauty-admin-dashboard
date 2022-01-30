import React from "react";

function Col({ children, variant, size }) {
  return <div className={`col ${size} ${variant? variant : ""}`}>{children}</div>;
}

export default Col;
