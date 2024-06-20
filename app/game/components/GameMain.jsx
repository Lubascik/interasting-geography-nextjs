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

    const mobileCheck = () => {
        let check = false;
        ((a) => { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };


    const onCopyLink = () => {
        if (mobileCheck()) {
            if (navigator?.share && navigator.canShare()) {
                navigator.share({ url: window.location })
            }
        } else
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