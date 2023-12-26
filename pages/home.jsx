import React from "react";
import styles from "../styles/home.module.sass";

const home = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["menu"]}>
        <h1 className={styles["title"]}>Interesting Geography</h1>
        <div className={styles["button-container"]}>
          <button className={styles["button"]}>New Game</button>
          <button className={styles["button"]}>Join Game</button>
          <button className={styles["button"]}>Credits</button>
          <button className={styles["button"]}>How to Play</button>
        </div>
      </div>
    </div>
  );
};

export default home;
