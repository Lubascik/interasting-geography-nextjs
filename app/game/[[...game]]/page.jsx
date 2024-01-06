'use client'
import React from "react";
import GameMain from "../components/GameMain";
import LoadingScreen from "../components/LoadingScreen";
// import useSWR from 'swr';
import { useEffect, useState } from 'react'
import io, { Socket } from "socket.io-client";
import CreateGame from "../components/CreateGame";
import { useCookies } from 'next-client-cookies';
import { setPlayerCookie, getCookie } from "../components/actions"
import GameHome from "../components/GameHome";

/** @type {Socket} */
let socket;

/**
 * Loading Game data
 * @returns {React.Component}
 */
const game = ({ params }) => {
    const [lang, setLang] = useState("en");
    const [isLoading, setIsLoading] = useState(true);
    const [gameData, setGameData] = useState(null);
    const [playerData, setPlayerData] = useState(null);
    const cookies = useCookies();
    const [cookie, setCookie] = useState({ uuid: cookies.get("player-uuid"), name: cookies.get("player-name") })
    const [currentUUID, setCurrentUUID] = useState(cookie?.uuid || null)

    let socketInitializing = false;

    let gameID
    if (params.game) {
        if (params.game[1]) {
            gameID = decodeURI(params.game[1])
        } else if (params.game[0]) {
            gameID = params.game[0]
        }
    }

    useEffect(() => {
        if (gameID && !socketInitializing) {
            socketInitializer(cookie)
            setIsLoading(true);
            if (params.game[1]) {
                // If we have a second param assume the first one is lang
                setLang(params.game[0])
            }
        } else {
            setIsLoading(false);
        }
    }, [])

    const socketInitializer = async (cookie) => {
        socketInitializing = true;
        await fetch('/api'); // Ping to create a socket server
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
            socket.emit("get-game", { gameID }, data => {
                setGameData(data)
                setIsLoading(false);
            })
            socket.emit("get-playerData", { gameID }, data => {
                setPlayerData(data)
                setIsLoading(false);
            })
            if (cookie) {
                socket.emit("create-newPlayer", { gameID, playerName: cookie.name, uuid: cookie.uuid }, (data) => {
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
        socket.on("vote-end", data => {
            setGameData(data.gameData)
            setPlayerData(data.playerData)
        })
    }

    if (isLoading) {
        return <LoadingScreen></LoadingScreen>
    } else if (gameData && playerData) {
        return <GameMain {...{ gameData, setGameData, playerData, setPlayerData, socket, currentUUID, setCurrentUUID }}></GameMain>
    } else if (!gameData) {
        return <GameHome></GameHome>
    }
};

export default game;
