"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'
import styles from "@styles/HomePage.module.sass"
import Stars from "images/stars-home.svg"
import Globe from "images/globe-home.svg"

import Logo from './game/components/Logo'

const page = () => {

  /** @param {WheelEvent} e */
  function handleScroll(e) {
    const deltaY = e.deltaY
    // console.log(deltaY);
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    }
  })


  return (
    <main className={styles.main} onScroll={handleScroll} onScrollCapture={handleScroll} style={{ backgroundImage: `url(${Stars.src})` }}>
      <div className={styles.game} style={{ backgroundImage: `url(${Globe.src})` }}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logoImage} lang="en" />
          <Link href="/game" >
            <button type="button" className={styles.startButton}>Start Playing!</button>
          </Link>
        </div>
      </div>
      {/* <div className={styles.gameInfo}>
        <img src="" alt="moon" />
      </div> */}
    </main>
  )
}

export default page