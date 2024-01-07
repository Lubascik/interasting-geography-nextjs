import React, { useState, useEffect } from 'react'
import styles from "@styles/game.module.sass";
import SidePanel from "./SidePanel";
import GameTable from "./GameTable";
import VoteTable from './VoteTable';
import NewPlayer from './NewPlayer';
import { useCookies } from 'next-client-cookies';

const GameMain = ({ gameData, setGameData, playerData, setPlayerData, socket, currentUUID, setCurrentUUID }) => {
    const [showInput, setShowInput] = useState(gameData.gameState === 1)
    const cookies = useCookies();
    const cookieUUID = cookies.get("player-uuid")

    function handleOnStartVote(data) {
        setPlayerData(data.playerData);
        setGameData(data.gameData);
    }

    useEffect(()=>{
        function onFocus() {
            if (document.visibilityState === 'visible') {
                socket.emit("active")
            } else {
                socket.emit("inactive")
            }
        }
        document.addEventListener("visibilitychange", onFocus);
        socket.on("start-vote", handleOnStartVote)
        return ()=>{
            document.removeEventListener("visibilitychange", onFocus)
            socket.off("start-vote", handleOnStartVote)
        }
    },[])

    useEffect(() => {
        if (gameData.gameState === 1) {
            setShowInput(true)
        }
    }, [gameData])

    const color = (() => {
        function getPlayerIndex() {
            for (let i = 0; i < playerData.length; i++) {
                const player = playerData[i];
                if (player.uuid === currentUUID) {
                    return i;
                }
            }
            return 0;
        }

        const colors = {
            0: "#10AC84",
            1: "#EE5253",
            2: "#2E86DE",
            3: "#FF9F43",
            4: "#341F97",
            5: "#F368E0",
        }

        const index = getPlayerIndex()
        return colors[index]
    })()

    return (
        <div className={styles["main"]}>
            {
                !currentUUID && <NewPlayer {...{ socket, gameData, setCurrentUUID }}></NewPlayer>
            }
            <div className={styles["container"]}>
                <SidePanel {...{ setCurrentUUID, gameData, playerData, socket, color }}></SidePanel>
                <div className={styles["main-panel"]} style={{ border: "5px solid " + color }}>
                    {
                        gameData.gameState !== 2 &&
                        <GameTable {...{ gameData, setGameData, playerData: playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }}></GameTable>
                    }
                    {
                        gameData.gameState === 2 &&
                        <VoteTable {...{ gameData, setGameData, playerData: playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }}></VoteTable>
                    }
                </div>
            </div>
        </div>
    )
}

export default GameMain