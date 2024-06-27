import React from "react";
import styles from "@styles/GameHome.module.sass";
import NewGame from "./NewGame";

const GameHome = ({ lang }) => {

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <NewGame lang={lang} />
            </div>
        </div>
    );
};

export default GameHome;
