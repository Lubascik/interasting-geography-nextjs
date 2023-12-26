

import React, { useEffect, useState } from 'react'
import styles from "../../styles/LoadingScreen.module.sass"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const LoadingScreen = () => {
  const loadingMessages = ["Calling mothership..", "Measuring Dick Size", "Test"]
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (messageIndex < loadingMessages.length - 1) {
        setProgress(((messageIndex + 1) / (loadingMessages.length - 1)) * 100)
        setMessageIndex(messageIndex + 1)
      } else {
        setProgress(0)
        setMessageIndex(0)
      }
    }, 1000);
  }, [messageIndex])

  return (
    <div className={styles["loadingScreen-container"]}>
      <div className={styles["loadingScreen-centerContainer"]}>
        <div className={styles["loadingScreen-loadingMessageContainer"]}>
          {/* <div className={styles["loadingScreen-loadingIcon"]}></div> */}
          <h1>The Game is loading some important data. Please wait while it struggles to do so.</h1>
          <br />
          <br />
          <h2>{loadingMessages[messageIndex]}</h2>
        </div>
        <div className={styles["loadingScreen-loadingBar"]}>
          {/* <FontAwesomeIcon className={styles["loadingScreen-loadingIcon"]} icon={solid("spinner")} spinPulse size="sm" /> */}
          <div className={styles["loadingScreen-progressBar"]} style={{ width: progress + "%" }}>
            <p style={{ color: "black", textAlign: "center" }}>{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen