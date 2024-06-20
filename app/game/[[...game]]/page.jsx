'use client'
import * as React from "react";
import GameMain from "../components/GameMain";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect, useState } from 'react'
import { useCookies } from 'next-client-cookies';
import { setPlayerCookie } from "../components/actions/setPlayerCookie"
import GameHome from "../components/GameHome";
import io from "socket.io-client";

let socket;
/**
 * Loading Game data
 * @returns {React.Component}
 */
const game = ({ params }) => {
    // const [lang, setLang] = useState("en");
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [playerData, setPlayerData] = useState(null);
    const cookies = useCookies();
    const [cookie, setCookie] = useState({ uuid: cookies.get("player-uuid"), name: cookies.get("player-name") })
    const [currentUUID, setCurrentUUID] = useState(cookie?.uuid || null)

    let socketInitializing = false;

    const v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    const languages = ["sr", "en"]
    let lang = "en";
    let gameID;
    if (params.game) {
        if (params.game[1]) {
            if (v4.test(params.game[1])) {
                gameID = decodeURI(params.game[1])
            }
        }
        if (params.game[0]) {
            if (v4.test(params.game[0])) {
                gameID = decodeURI(params.game[1])
            } else if (languages.includes(params.game[0])) {
                lang = params.game[0]
            }
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (gameID && !socketInitializing) {
            socketInitializer(cookie)
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [])

    const socketInitializer = async (cookie) => {
        socketInitializing = true;
        await fetch('/api'); // Ping to create a socket server
        socket = io(undefined, {
            query: {
                gameID,
                // playerUUID: cookie.uuid || null
            }
        })

        socket.on('connect', () => {
            console.log('connected')
            socket.emit("get-game", data => {
                setGameData(data)
                setIsLoading(false);
            })
            socket.emit("get-playerData", data => {
                setPlayerData(data)
                setIsLoading(false);
            })
            if (cookie) {
                socket.emit("create-newPlayer", { playerName: cookie.name, uuid: cookie.uuid }, (data) => {
                    if (data.error === undefined) {
                        setCurrentUUID(data.uuid)
                        setPlayerCookie(data)
                    } else {
                        console.log(data.error);
                    }
                })
            }
        })
        socket.on("update-playerData", (data) => {
            setPlayerData(data)
        })
        socket.on("update-gameData", (data) => {
            setGameData(data)
        })
        socket.on("start-round", (data) => {
            setGameData(data.gameData)
            setPlayerData(data.playerData)
        })
        socket.on("end-game", (data) => {
            setGameData(data.gameData)
            setPlayerData(data.playerData)
        })
        socket.on("vote-end", data => {
            setGameData(data.gameData)
            setPlayerData(data.playerData)
        })
    }

    if (isLoading) {
        return <LoadingScreen />
        // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (gameData && playerData) {
        return <GameMain {...{ gameData, setGameData, playerData, setPlayerData, socket, currentUUID, setCurrentUUID }} />
        // biome-ignore lint/style/noUselessElse: <explanation>
    } else if (!gameData) {
        return <GameHome {...{ lang }} />
    }
};

export default game;
