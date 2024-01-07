import React, { useEffect, useState } from "react";
import styles from "@styles/GameTable.module.sass";
import CellInput from "./CellInput.jsx";
import Cell from "./Cell.jsx";

const GameTable = ({ gameData, setGameData, playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }) => {
  const [columnValues, setColumnValues] = useState(new Map());
  const [started, setStarted] = useState(gameData.gameState !== 0);
  const [finished, setFinished] = useState(gameData.gameState === 3);

  let currentData = null
  if (!cookieUUID) {
      currentData = playerData[0]
  } else {
      currentData = playerData.filter(player => player.uuid === cookieUUID)[0]
  }

  const setColumnValue = (id, value) => {
    columnValues.set(id, value)
    setColumnValues(columnValues)
  }

  const onSubmitAnswers = () => {
    let vals = []
    columnValues.forEach((val, key) => {
      vals.push({ id: key, data: { text: val, points: null } })
    })

    socket.emit("add-row", { uuid: currentData.uuid, values: vals, letter: gameData.letter }, (data) => {
      // setGameData(data.gameData)
      setShowInput(false);
      if(data) {
        setPlayerData(data)
      }
    });
  }

  const [submit, setSubmit] = useState(false);
  useEffect(()=>{
    if(showInput && submit) {
      onSubmitAnswers();
    }
  }, [submit])

  function handleRoundEnd() {
    setSubmit(true)
  }

  useEffect(()=>{
    socket.on("round-end", handleRoundEnd)
    return ()=>{
      socket.off("round-end", handleRoundEnd)
    }
  },[])

  

  useEffect(() => {
    if (gameData.gameState !== 0) {
      setStarted(true)
    }
    if (gameData.gameState === 3) {
      // Game Finished
      setFinished(true)
    }
  }, [gameData])
  
  function handleNextField(id) {
    let index;
    for (let i = 0; i < gameData.columns.length; i++) {
      if(gameData.columns[i].id === id) {
        index = i;
        break;
      }
    }

    if(!gameData.columns[index+1]) {
      document.getElementById("submit-input").focus()
    } else {
      document.getElementById(gameData.columns[index+1].id + "-input").focus()
    }
  }

  return (
    <>
      {
        finished &&
        <div id="game-over" className={styles["wait-for-start"]}>
          <h1 style={{ margin: "auto" }}>Game Over!</h1>
          <h1 style={{ margin: "auto" }}>Winner is {playerData.reduce((prev, current) => prev.points > current.points ? prev : current).name}</h1>
        </div>
      }
      {
        !started &&
        <div id="waiting-for-start" className={styles["wait-for-start"]}>
          <h1 style={{ margin: "auto" }}>Waiting for host to start the game...</h1>
        </div>
      }
      <div className={styles["columns"]}>
        {
          gameData.columns.map((column, colIndex) => {
            let nIndex = 0;
            return (
              <div key={column.id} className={styles["column"]}>
                <div className={styles["column-header"]} style={{ background: color }}>
                  <h1 className={styles["column-title"]}>{column.name}</h1>
                </div>
                <div className={styles["column-content"]}>
                  {
                    currentData?.rows.map((row, rowIndex) => {
                      const cols = row.columns.filter(columnOfRow => columnOfRow.id === column.id)
                      if (cols.length >= 1) {
                        return cols.map((columnOfRow) => {
                          return <Cell key={column.id + "-cell-" + rowIndex + "-" + colIndex} data={columnOfRow.data} />
                        })
                      } else {
                        nIndex++;
                        return <Cell key={column.id + "-cell-" + nIndex + "-0"} data={{ text: "", points: 0 }} />
                      }
                    })
                  }
                  {
                    showInput &&
                    <CellInput key={column.id + "-input"} id={column.id} setValue={setColumnValue} nextField={handleNextField}></CellInput>
                  }
                </div>
              </div>
            )
          })
        }
        <div key={"column-results"} className={styles["column"]}>
          <div className={styles["column-header"]} style={{ background: color }}>
            <h1 className={styles["column-title"]}>Results</h1>
          </div>
          <div className={styles["column-content"]}>
            {
              currentData?.rows.map((row, index) => {
                const resultCol = row.columns.filter(col => col.id === "results")[0]
                return <Cell key={"row" + index} data={resultCol ? resultCol.data : { text: "", points: null }} />
                // return <p>{row.columns.filter(col => col.id === "results")[0].data.points}</p>
              })
            }
            {
              showInput &&
              <button id="submit-input" key={"submitButton"} onClick={() => { onSubmitAnswers() }} className={styles["column-button"]} style={{backgroundColor: color, color: "white"}}>Submit</button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default GameTable;
