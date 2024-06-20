import React, { useState, useEffect } from 'react'
import styles from "@styles/game.module.sass";
import SidePanel from "./SidePanel";
import GameTable from "./GameTable";
import VoteTable from './VoteTable';
import NewPlayer from './NewPlayer';
import { useCookies } from 'next-client-cookies';

const GameMain = ({ gameData, setGameData, playerData, setPlayerData, socket, currentUUID, setCurrentUUID }) => {
    const cookies = useCookies();
    const cookieUUID = cookies.get("player-uuid")
    const myPlayer = playerData.filter(player => player.uuid === cookieUUID)[0]
    const [showInput, setShowInput] = useState(gameData.gameState === 1 && (myPlayer && myPlayer.lastSubmitedRound !== gameData.round))
    const [copyLinkActive, setCopyLinkActive] = useState(false)

    function handleOnStartVote(data) {
        setPlayerData(data.playerData);
        setGameData(data.gameData);
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {

        function onFocus() {
            if (document.visibilityState === 'visible') {
                socket.emit("active")
            } else {
                socket.emit("inactive")
            }
        }
        document.addEventListener("visibilitychange", onFocus);
        socket.on("start-vote", handleOnStartVote)
        return () => {
            document.removeEventListener("visibilitychange", onFocus)
            socket.off("start-vote", handleOnStartVote)
        }
    }, [])

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const body = document.querySelector("body")
        const html = document.querySelector("html")
        body.style.height = "100%"
        body.style.overflowY = "hidden"
        html.style.height = "100%"
        html.style.overflowY = "hidden"
        if (gameData.gameState === 1 && (myPlayer && myPlayer.lastSubmitedRound !== gameData.round)) {
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

    useEffect(() => {
        if (copyLinkActive) {
            setTimeout(() => {
                setCopyLinkActive(false);
            }, 1400);
        }

    }, [copyLinkActive])


    const onCopyLink = () => {
        if (navigator?.clipboard?.writeText) {
            setCopyLinkActive(true);
            navigator.clipboard.writeText(window.location);
        }
    }

    return (
        <div className={styles.main}>
            {
                !currentUUID && <NewPlayer {...{ socket, gameData, setCurrentUUID }} />
            }
            <div className={styles.container}>
                <SidePanel {...{ setCurrentUUID, gameData, playerData, socket, color, onCopyLink }} />
                <div className={styles["main-panel"]} style={{ border: `5px solid ${color}` }}>
                    {
                        gameData.gameState !== 2 &&
                        <GameTable {...{ gameData, setGameData, playerData: playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }} />
                    }
                    {
                        gameData.gameState === 2 &&
                        <VoteTable {...{ gameData, setGameData, playerData: playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }} />
                    }
                </div>
            </div>
            <div className={styles.modal}>
                <div className={`${styles.copy_link_container} ${copyLinkActive ? styles.copy_active : ""}`}>
                    <h1 className={styles.copy_link_text}>Coppied Link to Clipboard!</h1>
                </div>
            </div>
        </div>
    )
}

export default GameMain