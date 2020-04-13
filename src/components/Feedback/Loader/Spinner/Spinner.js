import React from "react";

import styles from "./Spinner.module.scss";

const Spinner = ({ size = 80 }) => {
  // https://loading.io/css/
  return (
    <div className={styles.ldsRipple} style={{ height: size, width: size }}>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
