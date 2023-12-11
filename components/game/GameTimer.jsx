import styles from "./GameTimer.module.sass"

export default function GameTimer({ startTime, onTimeExpired }) {

    return (
        <div className={styles["timer-container"]}>
            <h1 className={styles["timer-text"]}>Time:</h1>
            <h1 className={styles["timer-time"]}>01:20</h1>
        </div>
    )
}