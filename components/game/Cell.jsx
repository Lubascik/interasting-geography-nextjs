import styles from "../../styles/Cell.module.sass";

export default function Cell({data}) {
    return (
        <div className={styles["cell"]}>
            <p className={styles["cell-text"]}>{data.text}</p>
            <p className={styles["cell-points"]}>{data.points}</p>
        </div>
    )
}