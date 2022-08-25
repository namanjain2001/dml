import React from "react";

const Alert = ({ children, variant }) => {
  return <div className={`alert text-center ${variant}`}>{children}</div>;
};

export default Alert;
