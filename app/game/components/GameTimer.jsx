import { useEffect, useState } from "react"
import styles from "@styles/GameTimer.module.sass"

export default function GameTimer({ time, className }) {
    const [clientTime, setTime] = useState()

    useEffect(() => {
        setTime(time)
    }, [time])

    const date = new Date(clientTime || time || 0)

    return (
        <div className={`${styles["timer-container"]} ${className}`}>
            <h1 className={styles["timer-text"]}>Time:</h1>
            <h1 className={styles["timer-time"]}>{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:{(date.getSeconds() < 10 ? '0' : '') + date.getSeconds()}</h1>
        </div>
    )
}