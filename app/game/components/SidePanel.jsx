
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
        router.push('/game')
    }

    const startGame = () => {
        socket.emit("start-game")
    }

    function handleOnStartRound(data) {
        setTime(data.gameData.time)
    }

    function handleOnTimeTick(data) {
        setTime(data)
    }

    useEffect(()=>{
        socket.on("start-round", handleOnStartRound)
        socket.on("time-tick", handleOnTimeTick)
        return ()=>{
            socket.off("start-round", handleOnStartRound)
            socket.off("time-tick", handleOnTimeTick)
        }
    }, []) 

    const _getSidepanelPlayer = (player) => {
        return (
            <div key={player.uuid} onClick={() => { /*setCurrentUUID(player.uuid)*/ }} className={styles["player"]}>
                <div className={styles["name-container"]}>
                    <span className={`${styles["status"]} ${styles[player.online ? player.active ? "active" : "inactive" : "offline"]}`} />
                    <h3 className={styles["name"]}>{player.name}</h3>
                </div>
                <h3 className={styles["points"]}>{player.points}</h3>
            </div>)
    }

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
                    <h1>Chat</h1>
                </div>
                {/* <input className='chat-input' type="text" /> */}
            </div>
            <div className={styles["side-button-container"]}>
                {
                    gameData.gameState === 0 && gameData.owner === playerUUID &&
                    <button onClick={() => { startGame() }} className={styles["side-button"]} style={{ background: color }}>Start Game!</button>
                }
                <button className={styles["side-button"]} style={{ background: color }}>Invite</button>
                <button onClick={() => { _exitGame() }} className={styles["side-button"]} style={{ background: color }}>Exit Game</button>
            </div>
        </div>
    )
}

export default SidePanel