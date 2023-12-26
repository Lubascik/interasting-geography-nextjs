import React, { useState } from "react";
import styles from "../../styles/GameTable.module.sass";
import CellInput from "./CellInput.jsx";
import Cell from "./Cell.jsx";

const GameTable = ({ gameData, playerData }) => {
  const [columnValues, setColumnValues] = useState(new Map());

  const setColumnValue = (id, value) => {
    columnValues.set(id, value)
    setColumnValues(columnValues)
  }

  const onSubmitAnswers = ()=> {
    // check if all columns are submited.
  }

  return (
    <div className={styles["columns"]}>
      {
        gameData.columns.map(column => {
          return (
            <div key={column.id} className={styles["column"]}>
              <div className={styles["column-header"]}>
                <h1 className={styles["column-title"]}>{column.name}</h1>
              </div>
              <div className={styles["column-content"]}>
                {
                  playerData.data.rows.map(row => {
                    return row.columns.filter(columnOfRow => columnOfRow.id === column.id).map((columnOfRow, index) => {
                      return <Cell key={column.id + "-cell-" + index} data={columnOfRow.data} />
                    })
                  })
                }
                <CellInput key={column.id + "-input"} id={column.id} setValue={setColumnValue}></CellInput>
              </div>
            </div>
          )
        })
      }
      <div key={"column-results"} className={styles["column"]}>
        <div className={styles["column-header"]}>
          <h1 className={styles["column-title"]}>Results</h1>
        </div>
        <div className={styles["column-content"]}>
          {
            playerData.data.rows.map((row, index) => {
              return <Cell key={"row" + index} data={row.columns.filter(col => col.id === "results")[0].data} />
              // return <p>{row.columns.filter(col => col.id === "results")[0].data.points}</p>
            })
          }
          {
            <button key={"submitButton"} onClick={()=>{onSubmitAnswers()}} className={styles["column-button"]}>Submit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default GameTable;
