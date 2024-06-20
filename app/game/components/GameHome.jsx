import React, { useState } from "react";
import styles from "@styles/GameHome.module.sass";
import NewGame from "./NewGame";
import Image from 'next/image'
import logoSRB from "/images/logo-srb.svg"
import logoEN from "/images/logo-en.svg"

const GameHome = ({ lang }) => {
    const [newGame, setNewGame] = useState(false)
    const [join, setJoin] = useState(false)
    function handleNewGame() {
        setNewGame(true)
        setJoin(false)
    }

    function handleJoin() {
        setNewGame(false)
        setJoin(true)
    }

    const logo = {
        en: { image: logoEN, alt: "Interesting Geography" },
        sr: { image: logoSRB, alt: "Zanimljiva Geografija" }
    }

    return (
        <>
            {
                newGame &&
                <div className={styles.modal}>
                    <NewGame onClose={() => { setNewGame(false) }} lang={lang} />
                </div>
            }
            <div className={styles.container}>
                <div className={styles.menu}>
                    {/* <h1 className={styles["title"]}>Interesting Geography</h1> */}
                    <div className={styles.logo}>
                        <Image src={logo[lang].image} alt={logo[lang].alt} />
                    </div>
                    <div className={styles["button-container"]}>
                        <button type="button" onClick={handleNewGame} className={styles.button}>New Game</button>
                        {/* <button onClick={handleJoin} className={styles["button"]}>Join</button> */}
                    </div>
                </div>
            </div>

        </>
    );
};

export default GameHome;
