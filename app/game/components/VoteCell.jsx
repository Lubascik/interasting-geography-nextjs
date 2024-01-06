import styles from "@styles/VoteCell.module.sass";

export default function VoteCell({ data, colID, handleVote, color, noVote, selected }) {
    const style = noVote ? { height: "50px" } : null
    return (
        <div className={styles["vote-cell"]} style={style}>
            {
                color &&
                <div className={styles["vote-cell-header"]} style={{ backgroundColor: color }}></div>
            }
            <div className={styles["vote-cell-results-container"]}>
                <p className={styles["vote-cell-text"]}>{data && data.text.length > 0 ? data.text : ""}</p>
                {
                    noVote &&
                    <p className={styles["vote-cell-points"]}>{data && data.points ? data.points : 0}</p>
                }
            </div>
            {
                !noVote && data &&
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