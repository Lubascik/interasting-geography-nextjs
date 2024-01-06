import React, { useState } from 'react'
import styles from "@styles/NewGame.module.sass"
import { createGameRedirect } from './actions'

const NewGame = () => {
  const playerNum = {
    min: 2,
    max: 8
  }
  const [maxPlayers, setMaxPlayers] = useState(playerNum.max)
  const [columns, setColumns] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();
    // if (!validateNotEmpty()) {
    //     return;
    // }
    const formData = new FormData(e.target)

    const data = {
      maxPlayers: formData.get("max-players"),
      lobbyName: formData.get("lobby-name"),
      columns: columns
    }

    const response = await fetch("/api/", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(data),
    });

    const gameID = await response.json();

    createGameRedirect(gameID)
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
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles['inputContainer']}>
            <label htmlFor="lobby-name">Lobby Name: </label>
            <input type="text" name="lobby-name" id="lobby-name" />
          </div>
        </div>
        <div className={styles["content"]}>
          <div className={styles["column"]}>
            <div className={styles['inputContainer']}>
              <label htmlFor="max-players">Max Players: {maxPlayers}</label>
              <input value={maxPlayers} onChange={(e) => { setMaxPlayers(e.target.value) }} type="range" min={playerNum.min} max={playerNum.max} name="max-players" id="max-players" />
            </div>
          </div>
          <div className={styles["column"]}>
            <div className={styles['inputContainer']}>
              <label htmlFor="add-column">Add Column</label>
              <input onChange={limitLength} onKeyDown={addColumnKeyDown} type="text" />
            </div>
            <div>
              {
                (() => {
                  const els = []
                  columns.forEach((val, index) => {
                    els.push(
                      <div key={"gameCol-" + index} className={styles['inputContainer']}>
                        <div>
                          <button onClick={(e) => { e.preventDefault(); move(true, index) }}>^</button>
                          <button onClick={(e) => { e.preventDefault(); move(false, index) }}>V</button>
                        </div>
                        <h3>{val}</h3>
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
        <div className={styles["footer"]}>
          <div className={styles['inputContainer']}>
            <input type='submit' value="Create Game" name='submit' />
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewGame