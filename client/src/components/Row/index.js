import React from "react";

function Row({ children, variant, gutter }) {
  return (
    <div className={`row ${variant? variant : ''} ${gutter ? "" : "no-gutters"}`}>
      {children}
    </div>
  );
}

export default Row;
