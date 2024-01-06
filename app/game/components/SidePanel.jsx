
import React, { useEffect, useState } from 'react'
import GameTimer from './GameTimer'
import styles from "@styles/SidePanel.module.sass";
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

const SidePanel = ({ playerData, gameData, setCurrentUUID, socket, color }) => {
    const [chat, setChat] = useState([]);
    const [time, setTime] = useState(gameData.time);
    const router = useRouter()
    const cookies = useCookies()
    const playerUUID = cookies.get("player-uuid")

    const _exitGame = () => {
        router.push('/home')
    }

    useEffect(() => {
        _initChat();
    }, [])

    const _initChat = () => {
        if (socket) {
            socket.emit('chat-get', { gameID: gameData.id })
        }
    }

    const startGame = () => {
        socket.emit("start-game", { gameID: gameData.id })
    }

    socket.on("game-started", () => {
        setTimerOnOff(true)
    })

    socket.on("time-tick", (data) => {
        setTime(data)
    })

    socket.on("round-end", () => {
        setTimerOnOff(false)
    })

    const _getSidepanelPlayer = (player) => {
        return (
            <div key={player.uuid} onClick={() => { /*setCurrentUUID(player.uuid)*/ }} className={styles["player"]}>
                <div className={styles["name-container"]}>
                    <span className={`${styles["status"]} ${styles[player.active ? "active" : "inactive"]}`} />
                    <h3 className={styles["name"]}>{player.name}</h3>
                </div>
                <h3 className={styles["points"]}>{player.points}</h3>
            </div>)
    }

    const [timerOn, setTimerOnOff] = useState(false)

    return (
        <div className={styles["side-panel"]}>
            <GameTimer {...{ time }}></GameTimer>
            <div className={styles["round-container"]}>
                <h1 className={styles["round-text"]}>Round: {gameData.round}</h1>
                <h1 className={styles["round-text"]}>Current Letter: {gameData.currentLetter}</h1>
            </div>

            <div className={styles["player-container"]}>
                {
                    // Other lobby members
                    playerData.map(_getSidepanelPlayer)
                }
            </div>
            <div className={styles["chat-container"]}>
                <div className='chat-message-container'>

                </div>
                <input className='chat-input' type="text" />
            </div>
            <div className={styles["side-button-container"]}>
                {
                    gameData.gameState === 0 && gameData.owner === playerUUID &&
                    <button onClick={() => { startGame() }} className={styles["side-button"]} style={{ background: color }}>Start Game!</button>
                }
                <button onClick={() => { setTimerOnOff(!timerOn) }} className={styles["side-button"]} style={{ background: color }}>Invite</button>
                <button onClick={() => { _exitGame() }} className={styles["side-button"]} style={{ background: color }}>Exit Game</button>
            </div>
        </div>
    )
}

export default SidePanel