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
        console.log("Client Connected:", socket.id);
        const gameID = socket.handshake.query.gameID;
        socket.join(gameID);
        const game = g_GameManager.getGame(gameID);
        if (!game) {
          return;
        }

        socket.on("disconnecting", () => {
          const uuid = g_GameManager.getPlayerUUID(socket.id)
          if(uuid) {
            game.disconnect(uuid);
          }
          g_GameManager.removeSocket(socket.id);
        });

        socket.on("get-game", (callback) => {
          callback(game.getAsJSON());
        });
        socket.on("get-playerData", (callback) => {
          callback(game.PlayerData);
        });
        socket.on("start-game", () => {
          game.startRound(io);
        });

        socket.on("add-row", ({ uuid, values }, callback) => {
          if (!game.players[uuid]) {
            return;
          }

          const playerData = game.addRow(uuid, values);
          callback(playerData);
        });

        socket.on("set-points", ({ uuid, votes }) => {
          const player = game.players[uuid];
          if (player) {
            game.setPoints(uuid, votes);
          }
        });

        socket.on("active", ()=>{
          const uuid = g_GameManager.getPlayerUUID(socket.id)
          if(uuid) {
            const player = game.players[uuid]
            if(player) {
              player.Active()
              io.to(gameID).emit("update-playerData", game.PlayerData)
            }
          }
        })
        
        socket.on("inactive", ()=>{
          const uuid = g_GameManager.getPlayerUUID(socket.id)
          if(uuid) {
            const player = game.players[uuid]
            if(player) {
              player.Inactive()
              io.to(gameID).emit("update-playerData", game.PlayerData)
            }
          }
        })

        socket.on("create-newPlayer", ({ playerName, uuid }, callback) => {
          // if(game.players.keys().length >= game.maxPlayers) {
          //   callback({error: {id: "full", msg: "Max amount of players reached!"}})
          //   return;
          // }
          console.log("Creating Player!", playerName, uuid);
          if (uuid && game.players[uuid]) {
            game.connect(uuid);
            g_GameManager.addPlayer({uuid, gameID, name: playerName, socketID: socket.id})
            callback({ uuid: uuid, name: playerName });
            return;
          }

          // Try creating a player
          const player = g_GameManager.createPlayer({ name: playerName, gameID: game.id, uuid: uuid, socketID: socket.id, io: io });
          if (!player) {
            console.log("Failed creating a player for game:", game.id);
            callback({ error: "Failed creating the player for game: " + game.id });
            return;
          }
          console.log("Created a new player for:", game.id);
          // g_GameManager.addPlayer({ uuid: player.uuid, name: player.name, gameID: game.id, socketID: socket.id });
          io.to(game.id).emit("update-playerData", game.PlayerData);

          // If after creating the player we have only 1 that means that we set the owner of the game to that player id and we need to update the game data
          if (Object.keys(game.players).length === 1) {
            io.to(game.id).emit("update-gameData", game.getAsJSON());
          }
          callback({ uuid: player.uuid, name: playerName });
        });
      });
    }
    res.end();
    return;
  }

  if (req.method === "GET") {
    const { game } = req.query;

    if(!game || !game[0]) {
      res.status(400);
      res.end();
    return
    }

    const selectedGame = g_GameManager.getGame(game[0]);
    if(selectedGame) {
      console.log(selectedGame);
      res.status(200).json({lobbyName: selectedGame.getAsJSON().lobbyName});
    } else {
      res.status(204);
    }
    res.end();
    return;
  }

  if (req.method === "POST") {
    const required = ["lobbyName", "maxPlayers", "timeLimit", "columns"];

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
