import styles from "@styles/Cell.module.sass";

export default function Cell({ data }) {
    return (
        <div className={styles["cell"]}>
            {
                data && data.text?.length > 0 &&
                <p className={styles["cell-text"]}>{data.text}</p>
            }
            {
                data && data.points !== null &&
                <p className={styles["cell-points"]}>{data.points}</p>
            }
            {
                !data &&
                <p className={styles["cell-points"]}>0</p>
            }
        </div>
    )
}