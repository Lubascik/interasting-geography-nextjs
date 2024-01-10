import { useState } from "react";
import styles from "@styles/CellInput.module.sass";

export default function CellInput({ id, setValue, nextField }) {
  const [currentValue, setCurrentValue] = useState("");
  const handleChange = (event) => {
    const value = event.currentTarget.value.length < 25 ? event.currentTarget.value : currentValue;
    setCurrentValue(value);
    setValue(id, value);
  };
  return (
    <div className={styles["input-cell"]}>
      <div style={{ width: "100%", height: "auto" }}>
        <input
          id={id + "-input"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              nextField(id);
            }
          }}
          value={currentValue}
          autoComplete="off"
          placeholder="Answer"
          onChange={handleChange}
          className={styles["input-cell-input"]}
          type="text"
        ></input>
      </div>
    </div>
  );
}
