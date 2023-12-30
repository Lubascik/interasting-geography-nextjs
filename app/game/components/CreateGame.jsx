import React, { useState } from 'react'
import styles from "@styles/CreateGame.module.sass"

const CreateGame = ({ lang }) => {
    const playerNum = {
        min: 2,
        max: 8
    }
    const [maxPlayers, setMaxPlayers] = useState(playerNum.max)
    const [columns, setColumns] = useState([])
    
    function handleSubmit(e) {
        e.preventDefault();
        if(!validateNotEmpty()) {
            return;
        }
        const formData = new FormData(e.target)
        // console.log("Max Players:", formData.get("max-players"));
        for (const [key, value] of formData) {
            console.log(key, value);

        }

    }

    function addColumn(e) {
        //TODO Add max length to the column names
        if (e.target.value === "") {
            return
        }
        if (columns.length > 10) {
            return;
        }
        const array = new Array(...columns)
        array.push(e.target.value)
        setColumns(array)
        // console.log("Added:", e.target.value, "as", columns.length);
    }

    function addColumnKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            addColumn(e);
        }
    }
    function removeCol(index) {
        columns.splice(index, 1)
        const array = [...columns]
        setColumns(array)
    }

    function move(up, index) {
        if (up && index - 1 < 0) {
            return
        }
        if (!up && index + 1 > columns.length - 1) {
            return
        }
        const item = columns[index];
        columns.splice(index, 1)
        columns.splice(up ? index - 1 : index + 1, 0, item)
        const array = [...columns]
        setColumns(array)
    }

    function validateNotEmpty() {
        //TODO validation + adding visual cue
        const inputs = ["game-columns", "max-players", "lobby-name"]
    }

    return (
        <form onSubmit={handleSubmit} action="">
            <div className={styles["CreateGame-container"]}>
                <div className={styles["CreateGame-createWindow"]}>
                    <div className={styles["CreateGame-createWindow-column"]}>
                        <div className={styles['CreataGame-inputContainer']}>
                            <label htmlFor="lobby-name">Lobby Name: </label>
                            <input type="text" name="lobby-name" id="lobby-name" />
                        </div>
                        <div className={styles['CreataGame-inputContainer']}>
                            <label htmlFor="max-players">Max Players: {maxPlayers}</label>
                            <input value={maxPlayers} onChange={(e) => { setMaxPlayers(e.target.value) }} type="range" min={playerNum.min} max={playerNum.max} name="max-players" id="max-players" />
                        </div>
                        <div className={styles['CreataGame-inputContainer']}>
                            <input type='submit' value="Create Game" name='submit' />
                        </div>
                    </div>
                    <div className={styles["CreateGame-createWindow-column"]}>
                        <div className={styles['CreataGame-inputContainer']}>
                            <label htmlFor="add-column">Add Column</label>
                            <input onKeyDown={addColumnKeyDown} type="text"/>
                        </div>
                        <div>
                            <div className={styles['CreataGame-inputContainer']}>
                                <h2>Columns:</h2>
                            </div>
                            {
                                (() => {
                                    const els = [<input name='game-columns' id='game-columns' type="text" style={{display: "none"}} value={columns.join(",")}/>]
                                    columns.forEach((val, index) => {
                                        els.push(
                                            <div key={"gameCol-" + index} className={styles['CreataGame-inputContainer']}>
                                                <div>
                                                    <button onClick={(e) => { e.preventDefault(); move(true, index) }}>^</button>
                                                    <button onClick={(e) => { e.preventDefault(); move(false, index) }}>V</button>
                                                </div>
                                                <h3>Index: {index} Val: {val}</h3>
                                                <button onClick={(e) => { e.preventDefault(); removeCol(index) }}>-</button>
                                            </div>
                                        )
                                    })
                                    return els
                                })()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CreateGame