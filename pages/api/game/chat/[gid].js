import g_GameManager from "providers/GameManager";
import g_APIAuth from "providers/APIAuth";


// This endpoint is only used for initialy loading the chat, the rest is handled by the socket.io
export default function handler(req, res) {
  function validateApi() {
    const apiKey = req.headers.authorization;
    // Api Validation
    if (!g_APIAuth.validate(apiKey)) {
      res.status(401);
      res.end();
      return false;
    }
  }

  if (req.method === "GET") {
    const { gid } = req.query;
    if (!validateApi()) {
      return;
    }

    const game = g_GameManager.getGame(gid);
    if (!game) {
      res.status(204);
    } else {
      res.status(200).json(game.Chat.getMessages());
    }
    res.end();
    return;
  }

  // Bad Request
  res.status(400);
  res.end();
  return;
}
