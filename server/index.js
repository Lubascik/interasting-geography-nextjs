import express from "express"
import path from "node:path"
import { fileURLToPath } from "url"
import session from "express-session"
import API from "./src/API/API.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 8080
const app = express()

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})

app.use("/", express.static(path.join(__dirname, "dist")))

app.use(
    session({
        secret: "shhh this is a secret...",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 },
    })
)

app.get("/api", (req, res) => {
    res.redirect("/")
})

const newEndpoint = (sEndpoint, aFunction) => {
    app.get(sEndpoint, (req, res) => {
        aFunction(req)
            .then((response) => {
                res.json(response)
            })
            .catch((response) => {
                res.json(response)
            })
    })
}

newEndpoint("/api/delteGame", API.deleteGame)
newEndpoint("/api/leaveGame", API.leaveGame)
newEndpoint("/api/addRow", API.addRow)
newEndpoint("/api/joinGame", API.joinGame)
newEndpoint("/api/getUUID", API.getUUID)
newEndpoint("/api/createGame", API.createGame)
newEndpoint("/api/getGame", API.getGame)

app.get("/api/update", (req, res) => {
    API.update(req, res)
})
