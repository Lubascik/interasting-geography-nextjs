import React, { useState } from "react";
import styles from "@styles/GameHome.module.sass";
import CreateGame from "./CreateGame";
import NewGame from "./NewGame";

const GameHome = () => {
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

    return (
        <>
            {
                newGame &&
                <div className={styles["modal"]}>
                    <NewGame></NewGame>
                </div>
            }
            <div className={styles["container"]}>
                <div className={styles["menu"]}>
                    <h1 className={styles["title"]}>Interesting Geography</h1>
                    <div className={styles["button-container"]}>
                        <button onClick={handleNewGame} className={styles["button"]}>New Game</button>
                        <button onClick={handleJoin} className={styles["button"]}>Join</button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default GameHome;
