import React from 'react'
import Link from 'next/link'
import styles from "@styles/HomePage.module.sass"

const page = () => {
  return (
    <div className={styles.container}>
      <h1>The home page is under construction. Click the button bellow to go to the game.</h1>
      <Link className={styles.button} href="/game">
        <h2>Go to game</h2>
      </Link>
    </div>
  )
}

export default page