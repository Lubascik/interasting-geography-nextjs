import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import API from "../API.js"

export default function deleteGame(req) {
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
        API.ActiveGames.delete(sGameID)
        resolve(Response.Success(true))
    })
}
