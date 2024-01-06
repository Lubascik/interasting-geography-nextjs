import React, { useEffect, useState } from "react";
import styles from "@styles/GameTable.module.sass";
import VoteCell from "./VoteCell.jsx";

const VoteTable = ({ gameData, setGameData, playerData, setPlayerData, socket, color, showInput, setShowInput, cookieUUID }) => {
    const [columnVotes, setColumnVotes] = useState(new Map())
    const [allColsSubmited, setAllColsSubmited] = useState(false)

    // console.log(playerData);
    function handleVote(colID, points) {
        const votesMap = new Map(columnVotes);
        votesMap.set(colID, points);
        setColumnVotes(votesMap);
        let allColsSet = true;
        for (const column of playerData.filter(player => player.uuid === cookieUUID)[0]
            .rows.filter(row => row.round === gameData.round)[0]
            .columns) {
            if (!votesMap.has(column.id)) {
                allColsSet = false;
                break;
            }
        }

        if (allColsSet) {
            setAllColsSubmited(true);

            socket.emit("set-points", { gameID: gameData.id, uuid: cookieUUID, votes: Array.from(votesMap) })
        }
    }

    const colors = ["#10AC84", "#EE5253", "#2E86DE", "#FF9F43", "#341F97", "#F368E0"]

    return (
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
                                <VoteCell key={column.id + "-cell-myAnswers-" + colIndex} {...{
                                    data: playerData.filter(player => player.uuid === cookieUUID)[0]
                                        .rows.filter(row => row.round === gameData.round)[0]
                                        .columns.filter(col => col.id === column.id)[0]?.data,
                                    handleVote,
                                    colID: column.id,
                                    selected: columnVotes.has(column.id) ? columnVotes.get(column.id) : null,
                                    noVote: allColsSubmited
                                }}></VoteCell>
                                {
                                    playerData.map((player, playerIndex) => {
                                        return player.rows?.filter(row => row.round === gameData.round)
                                            .map((row, rowIndex) => {
                                                if (player.uuid === cookieUUID) {
                                                    return null;
                                                }
                                                const cols = row.columns.filter(columnOfRow => columnOfRow.id === column.id)
                                                if (cols.length >= 1) {
                                                    return cols.map((columnOfRow) => {
                                                        return <VoteCell noVote key={column.id + "-cell-" + rowIndex + "-" + colIndex} {...{ data: columnOfRow.data, color: colors[playerIndex] }} />
                                                    })
                                                } else {
                                                    nIndex++;
                                                    return <VoteCell noVote key={column.id + "-cell-" + nIndex + "-0"} {...{ color: colors[playerIndex] }} />
                                                }
                                            })
                                    })

                                }
                            </div>
                        </div>
                    )
                })
            }
            {
                playerData[0].rows.filter(row => row.round === gameData.round)[0].columns.filter(col => col.id === "results").length > 0 &&
                <div key={"column-results"} className={styles["column"]}>
                    <div className={styles["column-header"]} style={{ background: color }}>
                        <h1 className={styles["column-title"]}>Results</h1>
                    </div>
                    <div className={styles["column-content"]}>
                        <VoteCell noVote key={"results-column-myResults"} data={playerData.filter(player => player.uuid === cookieUUID)[0]
                                        .rows.filter(row => row.round === gameData.round)[0]
                                        .columns.filter(col => col.id === "results")[0]?.data} />
                        {
                            playerData.map((player, playerIndex) => {
                                if (player.uuid === cookieUUID) {
                                    return;
                                }
                                return player.rows.filter(row => row.round === gameData.round).map((row, index) => {
                                    const resultCol = row.columns.filter(col => col.id === "results")[0]
                                    return <VoteCell noVote key={"results-column-" + player.uuid} data={resultCol ? resultCol.data : { text: "", points: null }} color={player.uuid !== cookieUUID ? colors[playerIndex] : undefined} />
                                })
                            })
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default VoteTable;
