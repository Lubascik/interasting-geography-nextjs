import g_GameManager from "providers/GameManager";

const handler = (req, res) => {
    res.status(200).json(g_GameManager.getGame(req.query.id).getAsJSON())
    res.end()
    return
}

export default handler