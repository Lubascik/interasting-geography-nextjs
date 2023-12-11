import React, { useState } from "react";
import GameTable from "../components/game/GameTable";
import styles from "./game.module.sass";
import { useRouter } from 'next/router'
import GameTimer from "../components/game/GameTimer";

const game = () => {
  const [currentUUID, setCurrentUUID] = useState("{15fe8812-3e09-4a0f-89c1-e365d8858ddf}")
  const router = useRouter()
  console.log(router.query);

  const colors = {
    green: "#10AC84",
    red: "#EE5253",
    blue: "#2E86DE",
    yellow: "#FF9F43",
    purple: "#341F97",
    pink: "#F368E0",
  }

  const gameData = {
    round: 1,
    currentLetter: "A",
    columns: [
      { name: "Column1", id: "{e03e867b-bc61-4e3a-8c53-69908a299449}" },
      { name: "Column2", id: "{5d0d419d-93f5-44c7-8d11-bf56df419522}" },
      { name: "Column3", id: "{f5a1583a-2bcb-4dd0-b506-0b9f8cb4064e}" },
      { name: "Column4", id: "{ba3bcc33-fd46-4040-9023-8ad272e02655}" },
      { name: "Column5", id: "{ef9aad26-9353-4292-a574-4c13a327d790}" },
    ]
  }

const playerData = {
  players: [
    {
      uuid: "{15fe8812-3e09-4a0f-89c1-e365d8858ddf}",
      name: "AlexRS",
      points: 1000,
      color: "green",
      status: "active",
      data: {
        rows: [
          {
            letter: "A",
            columns: [
              {
                id: "{e03e867b-bc61-4e3a-8c53-69908a299449}",
                data:
                {
                  text: "My Answer",
                  points: 20
                }
              },
              {
                id: "{5d0d419d-93f5-44c7-8d11-bf56df419522}",
                data:
                {
                  text: "My Answer",
                  points: 20
                }
              },
              {
                id: "{f5a1583a-2bcb-4dd0-b506-0b9f8cb4064e}",
                data:
                {
                  text: "Lorem ipsum Lorem ipsum 1",
                  points: 20
                }
              },
              {
                id: "{ba3bcc33-fd46-4040-9023-8ad272e02655}",
                data:
                {
                  text: "My Answer",
                  points: 20
                }
              },
              {
                id: "{ef9aad26-9353-4292-a574-4c13a327d790}",
                data:
                {
                  text: "My Answer",
                  points: 20
                }
              },
              {
                id: "results",
                data:
                {
                  text: "Letter: A",
                  points: 100
                }
              }
            ]
          }
        ]
      },
    },
    {
      uuid: "{c280b6c2-57e5-4205-9346-c8b18baa300a}",
      name: "Markoni",
      points: 1000,
      color: "red",
      status: "active",
      data: {
        rows: []
      }
    },
    {
      uuid: "{6784128b-819b-423d-8381-e6fda1ca2397}",
      name: "Luigi",
      points: 1000,
      color: "blue",
      status: "inactive",
      data: {
        rows: []
      }
    },
    {
      uuid: "{df860ada-1411-47f2-936f-16d40ba0f08f}",
      name: "Julian",
      points: 1000,
      color: "yellow",
      status: "active",
      data: {
        rows: []
      }
    },
    {
      uuid: "{e29803ab-7e36-4d0b-aa75-1cf422992308}",
      name: "Neba",
      points: 1000,
      color: "purple",
      status: "active",
      data: {
        rows: []
      }
    },
    {
      uuid: "{d958dbbb-f6e8-42fa-849f-a08642044144}",
      name: "Boris",
      points: 1000,
      color: "pink",
      status: "active",
      data: {
        rows: []
      }
    }
  ]
}

const currentData = playerData.players.filter(player => player.uuid === currentUUID)[0]

const _getSidepanelPlayer = (player) => {
  return (
    <div key={player.uuid} onClick={()=>{setCurrentUUID(player.uuid)}} className={styles["player"]} style={{ backgroundColor: colors[player.color] }}>
      <div className={styles["name-container"]}>
        <span className={`${styles["status"]} ${styles[player.status]}`} />
        <h3 className={styles["name"]}>{player.name}</h3>
      </div>
      <h3 className={styles["points"]}>{player.points}</h3>
    </div>)
}

return (
  <div className={styles["main"]}>
    <div className={styles["container"]}>
      <div className={styles["side-panel"]}>
        <GameTimer></GameTimer>
        <div className={styles["round-container"]}>
          <h1 className={styles["round-text"]}>Round: {gameData.round}</h1>
          <h1 className={styles["round-text"]}>Current Letter: {gameData.currentLetter}</h1>
        </div>
        <div className={styles["player-container"]}>
          {
            // Other lobby members
            playerData.players.map(_getSidepanelPlayer)
          }
        </div>
        <div className={styles["chat-container"]}>
          <h1>CHAT</h1>
        </div>
        <div className={styles["side-button-container"]}>
          <button className={styles["side-button"]}>Invite</button>
          <button className={styles["side-button"]}>Exit Game</button>
        </div>
      </div>
      <div className={styles["main-panel"]}>
        <GameTable gameData={gameData} playerData={currentData}></GameTable>
      </div>
    </div>
  </div>
);
};

export default game;
