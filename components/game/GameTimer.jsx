import { useEffect, useState } from "react"
import styles from "../../styles/GameTimer.module.sass"

export default function GameTimer({ startTime, onTimeExpired, timerOn }) {
    const [time, setTime] = useState(startTime || 0)

    useEffect(() => {
        if (timerOn && time > 0) {
            setTimeout(() => {
                if (time > 0 && time - 1000 > 0) {
                    setTime(time - 1000)
                } else {
                    setTime(0)
                    onTimeExpired();
                }
            }, 1000);
        }
    }, [timerOn, time])

    const date = new Date(time)

    return (
        <div className={styles["timer-container"]}>
            <h1 className={styles["timer-text"]}>Time:</h1>
            <h1 className={styles["timer-time"]}>{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:{(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()}</h1>
        </div>
    )
}