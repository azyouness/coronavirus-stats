import React from "react";

import styles from "./ContentTitle.module.scss";

const ContentTitle = ({ children }) => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default ContentTitle;
