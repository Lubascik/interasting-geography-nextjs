'use client'
import { useEffect, useState } from 'react'
import io from "socket.io-client";

let socket;

const Credits = () => {
    const [input, setInput] = useState('')

    useEffect(() => {
        socketInitializer()
        return () => {
            // if(socket) {
            //     socket.disconnect()
            // }
        }
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket/io');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update-input', msg => {
            setInput(msg)
        })
    }

    const onChangeHandler = (e) => {
        // setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    return (
        <>
            <h1>{input}</h1>
            <input
                placeholder="Type something"
                value={input}
                onChange={onChangeHandler}
            />
        </>
    )
}

export default Credits;