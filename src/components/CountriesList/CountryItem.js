import React from "react";
import { FaAngleDoubleRight as SelectedIcon } from "react-icons/fa";

import styles from "./CountryItem.module.scss";

const CountryItem = ({ country, onClick, isActive = false }) => {
  return (
    <li
      onClick={onClick}
      className={`${styles.item} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.activeIcon}>
        <SelectedIcon />
      </span>
      <span className={styles.countryName}>{country.name}</span>
      <span className={styles.countryCases}>{country.cases.confirmed}</span>
    </li>
  );
};

export default CountryItem;
