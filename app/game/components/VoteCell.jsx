import styles from "@styles/VoteCell.module.sass";

export default function VoteCell({ data, colID, handleVote, color, noVote, selected, showPoints }) {
    const style = noVote ? { height: "50px" } : null
    const points = data && data.points ? data.points < selected ? selected : data.points : selected && selected > 0 ? selected : 0 
    return (
        <div className={styles["vote-cell"]} style={style}>
            {
                color &&
                <div className={styles["vote-cell-header"]} style={{ backgroundColor: color }}></div>
            }
            <div className={styles["vote-cell-results-container"]}>
                <p className={styles["vote-cell-text"]}>{data && data.text.length > 0 ? data.text : ""}</p>
                {
                    showPoints &&
                    <p className={styles["vote-cell-points"]}>{points}</p>
                }
            </div>
            {
                !noVote && data && data.points !== 0 &&
                <div className={styles["vote-cell-input"]}>
                    <button {...{ disabled: selected === 0 }} onClick={() => { handleVote(colID, 0) }}>0</button>
                    <button {...{ disabled: selected === 5 }} onClick={() => { handleVote(colID, 5) }}>5</button>
                    <button {...{ disabled: selected === 10 }} onClick={() => { handleVote(colID, 10) }}>10</button>
                    <button {...{ disabled: selected === 20 }} onClick={() => { handleVote(colID, 20) }}>20</button>
                </div>
            }
        </div>
    )
}