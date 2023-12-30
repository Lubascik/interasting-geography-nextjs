
import { useState } from "react";
import styles from "@styles/CellInput.module.sass";

export default function CellInput({ id, setValue }) {
    const [showInput, setShowInput] = useState(true)
    const [currentValue, setCurrentValue] = useState("")
    const setData = (event) => {
        if(event) {
            event.preventDefault();
        }
        setValue(id, currentValue);
        setShowInput(!showInput);
    }
    return (
        <div className={styles["input-cell"]}>
            {
                showInput &&
                <form onSubmit={(event) => { event.preventDefault() }} style={{ width: "100%", height: "auto" }}>
                    <input onKeyDown={(e)=>{if (e.key === 'Enter') {setData()}}} value={currentValue} placeholder="Answer" onChange={(event) => { event.currentTarget.value.length < 25 ? setCurrentValue(event.currentTarget.value) : setCurrentValue(currentValue)}} className={styles["input-cell-input"]} type="text"></input>
                </form>
            }
            {
                !showInput && <p className={styles["input-cell-text"]}>{currentValue}</p>
            }
            <button onClick={setData} className={styles["input-cell-add"]}>{showInput ? "+" : "-"}</button>
        </div>
    )
}