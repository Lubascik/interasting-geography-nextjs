import React from "react";
import styles from "@styles/home.module.sass";
import Link from 'next/link'




const home = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["menu"]}>
        <h1 className={styles["title"]}>Interesting Geography</h1>
        <div className={styles["button-container"]}>
          <Link href="/newGame" className={styles["button"]}>New</Link>
          <Link href="/game" className={styles["button"]}>Join</Link>
          <Link href="/credits" className={styles["button"]}>Credits</Link>
          <Link href="/rules" className={styles["button"]}>Rules</Link>
        </div>
      </div>
    </div>
  );
};

export default home;
