import React, { useState } from 'react'
import styles from "@styles/game.module.sass";
import SidePanel from "./SidePanel";
import GameTable from "./GameTable";

const GameMain = ({ gameData, playerData, socket }) => {
    const [currentUUID, setCurrentUUID] = useState("{15fe8812-3e09-4a0f-89c1-e365d8858ddf}")
    const currentData = playerData.players.filter(player => player.uuid === currentUUID)[0]

    return (
        <div className={styles["main"]}>
            <div className={styles["container"]}>
                <SidePanel {...{ setCurrentUUID, gameData, playerData, socket }}></SidePanel>
                <div className={styles["main-panel"]}>
                    <GameTable {...{ gameData, playerData: currentData }}></GameTable>
                </div>
            </div>
        </div>
    )
}

export default GameMain