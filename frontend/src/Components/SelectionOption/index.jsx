//Third Party Import
import React from "react";
//StyleSheet Import
import styles from "./style.module.css";
const SelectionOption = ({
  baseClass,
  buttonStyle,
  clickHandler,
  buttonText,
}) => {
  return (
    <div>
      <button
        className={`${baseClass} ${styles.button} ${styles[buttonStyle]}`}
        type="button"
        onClick={() => clickHandler(buttonText)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SelectionOption;
