import API from "../API.js"
import Response from "../Response.js"

export default function update(req, res) {
    const sGameID = req.query.id
    if (!sGameID) res.json(Response.Error("Invalid game ID!"))
    if (API.UpdateRequests.has(sGameID)) {
        const aGameUpdateRequests = API.UpdateRequests.get(sGameID)
        aGameUpdateRequests.push(res)
    } else {
        API.UpdateRequests.set(sGameID, [res])
    }
}
