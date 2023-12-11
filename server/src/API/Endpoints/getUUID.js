import Response from "../Response.js"
import uuidv5 from "uuidv5"

export default function getUUID(req) {
    return new Promise((resolve, reject) => {
        if (!req.session.id) {
            resolve(Response.Error("Couldnt get session id! If you think this may be a server issue please contact the website administrator!"))
            return
        }
        const sUUID = uuidv5("null", req.session.id)

        resolve(JSON.stringify(sUUID))
    })
}
