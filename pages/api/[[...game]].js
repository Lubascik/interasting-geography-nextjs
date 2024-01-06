"use server";
import { Server } from "socket.io";
import { g_GameManager } from "providers/globals";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export default function SocketHandler(req, res) {
  if (!req.headers["content-type"]) {
    if (!res.socket.server.io) {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        const clientId = socket.id;
        console.log("A client connected");
        console.log(`A client connected. ID: ${clientId}`);

        socket.on("get-game", ({ gameID }, callback) => {
          if (g_GameManager.games.has(gameID)) {
            socket.join(gameID); // Getting the game / Joining so we can add the socket to the game
            console.log("Getting game data for:", gameID);
            callback(g_GameManager.games.get(gameID).getAsJSON());
          }
        });
        socket.on("get-playerData", ({ gameID }, callback) => {
          if (g_GameManager.games.has(gameID)) {
            console.log("Getting Player data for:", gameID);
            callback(g_GameManager.games.get(gameID).PlayerData);
          }
        });
        socket.on("start-game", ({ gameID }, callback) => {
          if (g_GameManager.games.has(gameID)) {
            const game = g_GameManager.games.get(gameID);
            game.startRound(io);
            io.to(gameID).emit("game-started", game.getAsJSON());
          }
        });

        socket.on("add-row", ({ gameID, uuid, values }, callback) => {
          if (g_GameManager.games.has(gameID)) {
            const game = g_GameManager.games.get(gameID);
            if (!game.players[uuid]) {
              return;
            }

            const playerData = game.addRow(uuid, values);
            callback(playerData);
          }
        });

        socket.on("set-points", ({ gameID, uuid, votes }) => {
          if (g_GameManager.games.has(gameID)) {
            const game = g_GameManager.games.get(gameID);
            const player = game.players[uuid];
            if (player) {
              game.setPoints(uuid, votes);
            }
          }
        });

        socket.on("create-newPlayer", ({ gameID, playerName, uuid }, callback) => {
          if (g_GameManager.games.has(gameID)) {
            const game = g_GameManager.games.get(gameID);
            if (uuid && game.players[uuid]) {
              callback({ uuid: uuid, name: playerName });
              return;
            }
            const player = g_GameManager.createPlayer({ name: playerName, gameID, uuid: uuid });
            if (!player) {
              console.log("Failed creating a player for game:", gameID);
              callback({ error: "Failed creating the player for game: " + gameID });
              return;
            }
            console.log("Created a new player for:", gameID);
            g_GameManager.addPlayer({ uuid: player.uuid, name: player.name, gameID });
            io.to(gameID).emit("update-playerData", game.PlayerData);

            // If after creating the player we have only 1 that means that we set the owner of the game to that player id and we need to update the game data
            if (Object.keys(game.players).length === 1) {
              io.to(gameID).emit("update-gameData", game.getAsJSON());
            }
            callback({ uuid: player.uuid, name: playerName });
          }
        });
      });
    }
    res.end();
    return;
  }

  if (req.method === "GET") {
    // const { io } = req.query;

    // const selectedGame = g_GameManager.getGame(io[1]);
    res.status(200).json(selectedGame?.getAsJSON() || {});
    res.end();
    return;
  }

  if (req.method === "POST") {
    const required = ["lobbyName", "maxPlayers", "columns"];

    if (!req.headers["content-type"] || req.headers["content-type"] !== "application/json") {
      res.status(400);
      res.end();
      return;
    }

    const params = { ...req.body };
    const game = g_GameManager.createGame(params);
    res.json(game.id);
    res.end();
    return;
  }

  res.status(400);
  res.end();
  return;
}
