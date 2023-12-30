import g_GameManager from "providers/GameManager";
import g_APIAuth from "providers/APIAuth";

export default function handler(req, res) {
  const { gid } = req.query;
  // Api Validation
  const apiKey = req.headers.authorization;
  if (!g_APIAuth.validate(apiKey)) {
    res.status(401);
  }
  
  const game = g_GameManager.getGame(gid);
  if (!game) {
    res.status(404);
  } else {
    res.status(200).json(game.getAsJSON());
  }
  res.end();
  return;
}
