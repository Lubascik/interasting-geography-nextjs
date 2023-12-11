import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import uuidv5 from "uuidv5"
import API from "../API.js"

export default function joinGame(req) {
    return new Promise((resolve, reject) => {
        const sGameID = req.query.id
        const sUsername = req.query.username
        if (!sGameID) {
            throw new Error(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
        }
        if (!API.ActiveGames.has(sGameID)) {
            throw new Error(Response.Error(`Game with id ${sGameID} doesnt exist!`))
        }
        if (!sUsername) {
            throw new Error(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
        }

        const sUUID = uuidv5("null", req.session.id)

        const aGame = API.ActiveGames.get(sGameID)

        const aPlayerData = aGame.addPlayer(sUUID, sUsername)
        // console.log(aPlayerData)
        API._updateRequests(sGameID)
        console.log(`Player ${sUsername} joined the game with ID ${sGameID}`)

        resolve({
            PlayerData: aPlayerData,
            GameData: aGame,
        })
    })
}
