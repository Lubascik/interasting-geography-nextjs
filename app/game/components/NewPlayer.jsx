import styles from "@styles/NewPlayer.module.sass";
import React, { useState } from "react";
import { setPlayerCookie } from "./actions/setPlayerCookie";

const NewPlayer = ({ socket, gameData, setCurrentUUID }) => {
  const [error, setError] = useState(false)
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("playerName")
    console.log(`"${name}"`);
    if (!name || name === "") {
      setError("The name is required to join the session!");
      return;
    }
    socket.emit("create-newPlayer", { playerName: name }, (data) => {
      if (data.error === undefined) {
        setCurrentUUID(data.uuid);
        setPlayerCookie(data);
      } else {
        setError(data.error)
        console.log(data.error);
      }
    });
  }

  return (
    <div className={styles["newPlayer-main"]}>
      <div className={styles["newPlayer-container"]}>
        <h3>Please give us your name so others know how to call you during the session.</h3>
        <form onSubmit={handleSubmit} autoComplete="off" >
          {error ?
            <p className={styles.errorMessage}>{error}</p> : <br />
          }
          <input className={error ? styles.error : ""} placeholder="Name" type='text' id='playerName' name='playerName' />
          <button type='submit'>Start Playing!</button>
        </form>
      </div>
    </div>
  );
};

export default NewPlayer;
