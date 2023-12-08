import React from "react";
import styles from "./GameTable.module.sass";

const GameTable = () => {
  return (
    <div className={styles["columns"]}>
      {(() => {
        const res = [];
        for (let i = 0; i < 5; i++) {
          res.push(
            <div className={styles["column"]}>
              <div className={styles["column-header"]}>
                <h1 className={styles["column-title"]}>Column</h1>
              </div>
              <div className={styles["column-content"]}></div>
              <div className={styles["column-footer"]}>
                <input
                  type="text"
                  className={styles["column-input"]}
                  placeholder="Input"
                />
              </div>
            </div>
          );
        }
        return res;
      })()}
    </div>
  );
};

export default GameTable;
