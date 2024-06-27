import React, { useState } from 'react'
import styles from "@styles/NewGame.module.sass"
import { createGameRedirect } from './actions/createGameRedirect'

const NewGame = ({ onClose, lang }) => {
  const playerNum = {
    min: 2,
    max: 8
  }

  const timeLimitNum = {
    min: 10 * 1000,
    max: 60 * 1000
  }
  const [maxPlayers, setMaxPlayers] = useState(playerNum.max)
  const [timeLimit, setTimeLimit] = useState(timeLimitNum.max)
  const [columns, setColumns] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();
    // if (!validateNotEmpty()) {
    //     return;
    // }
    const formData = new FormData(e.target)

    const data = {
      maxPlayers: formData.get("maxPlayers"),
      timeLimit: formData.get("timeLimit"),
      lobbyName: formData.get("lobbyName"),
      columns: columns
    }

    const response = await fetch("/api/", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(data),
    });

    const gameID = await response.json();

    createGameRedirect(gameID, lang)
    // redirect("/en/"+JsonResponse)
    // console.log(JsonResponse);

  }

  function limitLength(e) {
    const maxLengthColumnName = 25
    e.preventDefault();
    if (e.target.value.length > maxLengthColumnName) {
      e.target.value = e.target.value.slice(0, maxLengthColumnName)
    }
    return;
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
      e.target.value = ""
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

  return (
    <form onSubmit={handleSubmit} action="">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>New Game</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="lobbyName">Lobby Name: </label>
            <input type="text" name="lobbyName" id="lobbyName" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            <div className={styles.inputContainer}>
              <label htmlFor="maxPlayers">Max Players: {maxPlayers}</label>
              <input value={maxPlayers} onChange={(e) => { setMaxPlayers(e.target.value) }} type="range" min={playerNum.min} max={playerNum.max} name="maxPlayers" id="maxPlayers" />
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="timeLimit">Time Limit: {timeLimit / 1000}s</label>
              <input step={1000} value={timeLimit} onChange={(e) => { setTimeLimit(e.target.value) }} type="range" min={timeLimitNum.min} max={timeLimitNum.max} name="timeLimit" id="timeLimit" />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.inputContainer}>
              <label htmlFor="add-column">Add Column</label>
              <input onChange={limitLength} onKeyDown={addColumnKeyDown} type="text" />
            </div>
            <div>
              {
                (() => {
                  const els = []
                  columns.forEach((val, index) => {
                    els.push(
                      <div key={`gameCol-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index}`} className={styles.inputContainer}>
                        <div className={styles.columnControls}>
                          <button type='button' onClick={(e) => { e.preventDefault(); move(true, index) }}>▲</button>
                          <button type='button' onClick={(e) => { e.preventDefault(); move(false, index) }}>▼</button>
                        </div>
                        <h3>{val}</h3>
                        <div className={styles.columnControls}>
                          <button type='button' onClick={(e) => { e.preventDefault(); removeCol(index) }}>ⓧ</button>
                        </div>
                      </div>
                    )
                  })
                  return els
                })()
              }
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button type='submit' name='submit'>Create Game</button>
          <button type='button' onClick={(e) => { e.preventDefault(); onClose() }}>Close</button>
        </div>
      </div>
    </form>
  )
}

export default NewGame