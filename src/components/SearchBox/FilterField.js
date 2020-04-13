import React from "react";
import { IoIosClose as ClearIcon } from "react-icons/io";
import styles from "./FilterField.module.scss";

const FilterField = ({ value, onChange, onClear, onEnterPress, ...rest }) => {
  const handleKeyPress = e => {
    e.preventDefault();
    if (e.keyCode === 27) {
      onClear();
    } else if(e.keyCode === 13) {
      onEnterPress();
    }
  };

  return (
    <div className={styles.field}>
      <input
        value={value}
        onChange={onChange}
        onKeyUp={handleKeyPress}
        className={styles.input}
        placeholder="Select a country ..."
        {...rest}
      />

      {value ? (
        <span className={styles.clearButton} onClick={onClear}>
          <ClearIcon />
        </span>
      ) : null}
    </div>
  );
};

export default FilterField;
