import styles from "@styles/NewPlayer.module.sass";
import React from "react";
import { setPlayerCookie } from "./actions";

const NewPlayer = ({ socket, gameData, setCurrentUUID }) => {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    socket.emit("create-newPlayer", { playerName: formData.get("playerName") }, (data) => {
      if (data.error === undefined) {
        setCurrentUUID(data.uuid);
        setPlayerCookie(data);
      } else {
        console.log(data.error);
      }
    });
  }

  return (
    <div className={styles["newPlayer-main"]}>
      <div className={styles["newPlayer-container"]}>
        <h3>Welcome! Please give us your name so others can identify you during the game.</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor='playerName'>Name:</label>
          <input className={styles["error"]} type='text' id='playerName' name='playerName' />
          <button type='submit'>Start Playing!</button>
          {/* <label htmlFor="color">Color:</label>
                    <select name="color" id="color">
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                    </select> */}
        </form>
      </div>
    </div>
  );
};

export default NewPlayer;
