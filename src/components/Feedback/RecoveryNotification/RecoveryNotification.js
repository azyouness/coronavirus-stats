import React, { useState } from "react";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
//
import styles from "./RecoveryNotification.module.scss";

// Recovered values all set to 0 !
// https://github.com/ExpDev07/coronavirus-tracker-api/issues/161
export default ({ open = false }) => {
  const [close, setClose] = useState(open);

  const handleClose = (e) => {
    e.preventDefault();
    setClose(false);
  };

  return (
    <div
      className={`${styles.notif} ${
        close ? styles.open : styles.close
      }`}
    >
      <span className={styles.icon}>
        <FaExclamationTriangle />
      </span>
      <p className={styles.text}>
        Data provider has decided to drop support for recovery data for now!
      </p>
      <button className={styles.closeBtn} onClick={handleClose}>
        <FaTimes />
      </button>
    </div>
  );
};
