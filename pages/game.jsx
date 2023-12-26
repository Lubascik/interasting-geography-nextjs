import React from "react";
import { useRouter } from 'next/router'
import GameMain from "../components/game/GameMain";
import LoadingScreen from "../components/game/LoadingScreen";

/**
 * Loading Game data
 * @returns 
 */
const game = () => {
  const router = useRouter()
  console.log(router.query);

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
        name: "Sanja",
        points: 1000,
        color: "pink",
        status: "active",
        data: {
          rows: []
        }
      }
    ]
  }

  const loading = true;

  return loading ?
    <LoadingScreen></LoadingScreen>
    :
    <GameMain {...{ gameData, playerData }}></GameMain>
};

export default game;
