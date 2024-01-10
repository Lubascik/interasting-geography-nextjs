import React, { useEffect, useState } from "react";
import styles from "@styles/GameTable.module.sass";
import VoteCell from "./VoteCell.jsx";

const VoteTable = ({ gameData, setGameData, playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }) => {
  const [columnVotes, setColumnVotes] = useState(new Map());
  const [allColsSubmited, setAllColsSubmited] = useState(false);
  const [colsChecked, setColsChecked] = useState(false);

  const currentRow = playerData.filter((player) => player.uuid === cookieUUID)[0]?.rows.filter((row) => row.round === gameData.round)[0];
  const currentPlayerColumns = currentRow ? currentRow.columns : [];

  if (!colsChecked) {
    const checkColsMap = new Map(columnVotes);
    for (const column of currentPlayerColumns) {
      if (column.data.points === 0 && !checkColsMap.has(column.id)) {
        checkColsMap.set(column.id, 0);
      }
    }
    handleVote(null, null, checkColsMap);
    setColsChecked(true);
  }

  // console.log(playerData);
  function handleVote(colID, points, map) {
    let votesMap = new Map(columnVotes);
    if (map) {
      votesMap = map;
    } else {
      votesMap.set(colID, points);
    }
    setColumnVotes(votesMap);
    let allColsSet = true;
    for (const column of currentPlayerColumns) {
      if (!votesMap.has(column.id)) {
        allColsSet = false;
        break;
      }
    }

    if (allColsSet) {
      setAllColsSubmited(true);

      socket.emit("set-points", { uuid: cookieUUID, votes: Array.from(votesMap) });
    }
  }

  const headerColors = ["#10AC84", "#EE5253", "#2E86DE", "#FF9F43", "#341F97", "#F368E0"];
  const backgroundColors = ["#c8e5de", "#e5c8c8", "#c8d6e5", "#e5d6c8", "#cdc8e5", "#e5c8e1"];

  let myIndex = 0;

  return (
    <div className={styles["columns"]}>
      {gameData.columns.map((column, colIndex) => {
        let nIndex = 0;
        return (
          <div key={column.id} className={styles["column"]}>
            <div className={styles["column-header"]} style={{ background: color }}>
              <h1 className={styles["column-title"]}>{column.name}</h1>
            </div>
            <div className={styles["column-content"]}>
              {playerData.map((player, playerIndex) => {
                if (player.uuid === cookieUUID) {
                  myIndex = playerIndex
                }
                return player.rows
                  ?.filter((row) => row.round === gameData.round)
                  .map((row, rowIndex) => {
                    if (player.uuid === cookieUUID) {
                      return null;
                    }
                    const cols = row.columns.filter((columnOfRow) => columnOfRow.id === column.id);
                    if (cols.length >= 1) {
                      return cols.map((columnOfRow) => {
                        return <VoteCell showPoints={allColsSubmited} noVote key={column.id + "-cell-" + rowIndex + "-" + colIndex} {...{ data: columnOfRow.data, headerColor: headerColors[playerIndex], backgroundColor: backgroundColors[playerIndex] }} />;
                      });
                    } else {
                      nIndex++;
                      return <VoteCell showPoints={allColsSubmited} noVote key={column.id + "-cell-" + nIndex + "-0"} {...{ headerColor: headerColors[playerIndex], backgroundColor: backgroundColors[playerIndex] }} />;
                    }
                  });
              })}
              {currentPlayerColumns.length > 0 && (
                <VoteCell
                  key={column.id + "-cell-myAnswers-" + colIndex}
                  {...{
                    data: currentPlayerColumns.filter((col) => col.id === column.id)[0]?.data,
                    handleVote,
                    colID: column.id,
                    selected: columnVotes.has(column.id) ? columnVotes.get(column.id) : null,
                    noVote: allColsSubmited || currentPlayerColumns.filter((col) => col.id === "results").length > 0,
                    showPoints: allColsSubmited,
                    headerColor: color,
                    backgroundColor: backgroundColors[myIndex]
                  }}></VoteCell>
              )}
            </div>
          </div>
        );
      })}
      {currentPlayerColumns.length > 0 && currentPlayerColumns.filter((col) => col.id === "results").length > 0 && (
        <div key={"column-results"} className={styles["column"]}>
          <div className={styles["column-header"]} style={{ background: color }}>
            <h1 className={styles["column-title"]}>Results</h1>
          </div>
          <div className={styles["column-content"]}>
            {playerData.map((player, playerIndex) => {
              if (player.uuid === cookieUUID) {
                return;
              }
              return player.rows
                .filter((row) => row.round === gameData.round)
                .map((row, index) => {
                  const resultCol = row.columns.filter((col) => col.id === "results")[0];
                  return <VoteCell showPoints noVote key={"results-column-" + player.uuid} data={resultCol ? resultCol.data : { text: "", points: null }} headerColor={player.uuid !== cookieUUID ? headerColors[playerIndex] : undefined} backgroundColor={backgroundColors[playerIndex]} />;
                });
            })}
            <VoteCell showPoints noVote key={"results-column-myResults"} headerColor={color} backgroundColor={backgroundColors[myIndex]} data={currentPlayerColumns.filter((col) => col.id === "results")[0]?.data} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VoteTable;
