import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import uuidv5 from "uuidv5"
import API from "../API.js"

export default function leaveGame(req) {
    return new Promise((resolve, reject) => {
        const sGameID = req.query.id
        if (!sGameID) {
            reject(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
            return
        }
        if (!API.ActiveGames.has(sGameID)) {
            reject(Response.Error(`Game with id ${sGameID} doesnt exist!`))
            return
        }
        const sPlayerID = uuidv5("null", req.session.id)
        try {
            API.ActiveGames.get(sGameID).removePlayer(sPlayerID)
        } catch (error) {
            reject(Response.Error(error))
            return
        }

        resolve(Response.Success(true))
    })
}
