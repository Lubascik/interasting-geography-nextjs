import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import uuidv5 from "uuidv5"
import Game from "../../Game/Game.js"
import API from "../API.js"
import GameInterface from "../../Game/Interfaces/GameInterface.js"

export default function createGame(req) {
    return new Promise((resolve, reject) => {
        const sGameID = uuidv5("null", req.session.id)

        if (API.ActiveGames.has(sGameID)) {
            reject(Response.Error(ErrorMessage.GAME_EXISTS))
            return
        }
        if (!req.query.table) {
            reject(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
            return
        }

        const aTableTemplate = JSON.parse(req.query.table)

        const aNewGame = new Game(new GameInterface(aTableTemplate, sGameID))
        API.ActiveGames.set(sGameID, aNewGame)

        console.log(`Created a new game with ID ${sGameID}`)

        const aResponse = Response.GameData(aNewGame)
        resolve(aResponse)
    })
}
