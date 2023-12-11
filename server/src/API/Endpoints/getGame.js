import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import API from "../API.js"

export default function getGame(req) {
    return new Promise((resolve, reject) => {
        const sGameID = req.query.id
        if (!sGameID) {
            reject(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
            return
        }
        const aGame = API.ActiveGames.get(sGameID)
        if (!aGame) {
            reject(Response.Error(`Game with the id ${sGameID} doesnt exist!`))
            return
        }

        resolve(Response.GameData(aGame))
    })
}
