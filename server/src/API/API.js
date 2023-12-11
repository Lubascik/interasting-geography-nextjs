import leaveGame from "./Endpoints/leaveGame.js"
import createGame from "./Endpoints/createGame.js"
import deleteGame from "./Endpoints/deleteGame.js"
import joinGame from "./Endpoints/joinGame.js"
import getGame from "./Endpoints/getGame.js"
import getUUID from "./Endpoints/getUUID.js"
import addRow from "./Endpoints/addRow.js"
import update from "./Endpoints/update.js"
import Game from "../Game/Game.js"
import GameInterface from "../Game/Interfaces/GameInterface.js"

export default class API {}

API.ActiveGames = new Map()
API.ActiveGames.set("test", new Game(new GameInterface(["City", "Country", "River", "Name", "Item"], "test")))

API.leaveGame = leaveGame
API.createGame = createGame
API.deleteGame = deleteGame
API.joinGame = joinGame
API.getGame = getGame
API.getUUID = getUUID
API.addRow = addRow
API.update = update

API.UpdateRequests = new Map()

API._updateRequests = (sGameID) => {
    if (!API.UpdateRequests.has(sGameID)) return
    API.UpdateRequests.get(sGameID).forEach((res) => {
        res.json(API.ActiveGames.get(sGameID))
    })
}
