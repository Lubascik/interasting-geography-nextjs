import Response from "../Response.js"
import ErrorMessage from "../ErrorMessages.js"
import uuidv5 from "uuidv5"
import Player from "../../Game/Player.js"
import API from "../API.js"

export default function addRow(req) {
    return new Promise((resolve, reject) => {
        const sUUID = uuidv5("null", req.session.id)
        const sGameID = req.query.id

        //Check Inputs
        if (!sGameID) {
            reject(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
            return
        }
        if (!API.ActiveGames.get(sGameID)) {
            reject(Response.Error(`Game with id ${sGameID} doesnt exist!`))
            return
        }
        if (!req.query.row) {
            reject(Response.Error(ErrorMessage.NOT_ENOUGH_INPUTS))
            return
        }

        // Add check if player is in game and active
        const player = API.ActiveGames.get(sGameID).getPlayer(sUUID)
        if (player === null || player.status === Player.STATUS.INACTIVE) {
            reject(Response.Error(ErrorMessage.NOT_INGAME))
            return
        }

        const aRow = JSON.parse(req.query.row)

        for (let i = 0; i < API.ActiveGames.get(sGameID).TableTemplate.length; i++) {
            const column = API.ActiveGames.get(sGameID).TableTemplate[i]
            if (!aRow[column]) {
                reject(Response.Error("Invalid Row Config!"))
                return
            }
        }

        player.getTable().addRow(aRow)
        API._updateRequests(sGameID)
        resolve(Response.PlayerData(player))
    })
}
