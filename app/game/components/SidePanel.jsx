
import React, { useEffect, useState } from 'react'
import GameTimer from './GameTimer'
import styles from "@styles/SidePanel.module.sass";
import { useRouter } from 'next/navigation'

const colors = {
    green: "#10AC84",
    red: "#EE5253",
    blue: "#2E86DE",
    yellow: "#FF9F43",
    purple: "#341F97",
    pink: "#F368E0",
}

const SidePanel = ({ playerData, gameData, setCurrentUUID, socket }) => {
    const [chat, setChat] = useState([]);
    const router = useRouter()

    const _exitGame = () => {
        router.push('/home')
    }

    useEffect(()=>{
        _initChat();
    }, [])

    const _initChat = () => {
        if(socket) {
            socket.emit('chat-get', {id: gameData.id})
        }
    }

    const _getSidepanelPlayer = (player) => {
        return (
            <div key={player.uuid} onClick={() => { setCurrentUUID(player.uuid) }} className={styles["player"]} style={{ backgroundColor: colors[player.color] }}>
                <div className={styles["name-container"]}>
                    <span className={`${styles["status"]} ${styles[player.status]}`} />
                    <h3 className={styles["name"]}>{player.name}</h3>
                </div>
                <h3 className={styles["points"]}>{player.points}</h3>
            </div>)
    }

    const [timerOn, setTimerOnOff] = useState(false)

    return (
        <div className={styles["side-panel"]}>
            <GameTimer {...{ startTime: 1000 * 60 * 5, onTimeExpired: () => { alert("test") }, timerOn: timerOn }}></GameTimer>
            <div className={styles["round-container"]}>
                <h1 className={styles["round-text"]}>Round: {gameData.round}</h1>
                <h1 className={styles["round-text"]}>Current Letter: {gameData.currentLetter}</h1>
            </div>
            <div className={styles["player-container"]}>
                {
                    // Other lobby members
                    playerData.players.map(_getSidepanelPlayer)
                }
            </div>
            <div className={styles["chat-container"]}>
                <div className='chat-message-container'>

                </div>
                <input className='chat-input' type="text" />
            </div>
            <div className={styles["side-button-container"]}>
                <button onClick={() => { setTimerOnOff(!timerOn) }} className={styles["side-button"]}>Invite</button>
                <button onClick={() => { _exitGame() }} className={styles["side-button"]}>Exit Game</button>
            </div>
        </div>
    )
}

export default SidePanel