import React from "react";
import styles from "./SortButton.module.scss";
import {
  FaSortNumericDown,
  FaSortNumericUp,
  FaSortAlphaDown,
  FaSortAlphaUp
} from "react-icons/fa";

const SortButton = ({ onClick, type, order, isActive = false }) => {
  let Icon = null;

  if (type === "num") {
    Icon = order === "desc" ? FaSortNumericUp : FaSortNumericDown;
  } else if (type === "alpha") {
    Icon = order === "desc" ? FaSortAlphaDown : FaSortAlphaUp;
  }

  return (
    <div 
      onClick={onClick}
      className={`${styles.button} ${isActive ? styles.active : ""}`}
    >
      <Icon />
    </div>
  );
};

export default SortButton;
