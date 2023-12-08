import React from "react";
import GameTable from "../components/game/GameTable";
import styles from "./game.module.sass";

const game = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["container"]}>
        <div className={styles["side-panel"]}>
          <div className={styles["letter-container"]}>
            <h1 className={styles["letter-text"]}>A</h1>
          </div>
          <div className={styles["player-container"]}>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["active"]}`} />
                <h3 className={styles["name"]}>AlexRS</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["inactive"]}`} />
                <h3 className={styles["name"]}>Markoni</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["active"]}`} />
                <h3 className={styles["name"]}>Luigi</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["active"]}`} />
                <h3 className={styles["name"]}>Julian</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["active"]}`} />
                <h3 className={styles["name"]}>Neba</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
            <div className={styles["player"]}>
              <div className={styles["name-container"]}>
                <span className={`${styles["status"]} ${styles["active"]}`} />
                <h3 className={styles["name"]}>Boris</h3>
              </div>
              <h3 className={styles["points"]}>1000</h3>
            </div>
          </div>
          <div className={styles["chat-container"]}>
            <h1>CHAT</h1>
          </div>
          <div className={styles["side-button-container"]}>
            <button className={styles["side-button"]}>Invite</button>
            <button className={styles["side-button"]}>Exit Game</button>
          </div>
        </div>
        <div className={styles["main-panel"]}>
          <GameTable></GameTable>
        </div>
      </div>
    </div>
  );
};

export default game;
