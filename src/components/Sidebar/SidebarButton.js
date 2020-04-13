import React from "react";
import { MdArrowBack as ToggleIcon } from "react-icons/md";
import styles from "./SidebarButton.module.scss";

export default ({ open, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.button} ${open ? "" : styles.close}`}
    >
      <span className={styles.icon}><ToggleIcon /></span>
      <span className={styles.text}>
        {open ? "Close" : "open"}
        <br />
        countries list
      </span>
    </div>
  );
};
