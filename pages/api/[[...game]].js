"use server";
import { Server } from "socket.io";
import { g_GameManager } from "providers/globals";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const SocketHandler = (req, res) => {
  if (!req.headers["content-type"]) {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        const clientId = socket.id;
        console.log("A client connected");
        console.log(`A client connected. ID: ${clientId}`);

        socket.on("get-game", (params) => {
          const gameID = decodeURI(params.gameID);
          if (g_GameManager.games.has(gameID)) {
            console.log("Found game with id: ", gameID);
            socket.emit("get-game", g_GameManager.games.get(gameID).getAsJSON());
          }
        });
      });
    }
    res.end();
    return;
  }

  if (req.method === "GET") {
    console.log("GET");

    console.log(req.query);
    const { io } = req.query;
    // if (!validateApi()) {
    //   return;
    // }

    const selectedGame = g_GameManager.getGame(io[1]);
    res.status(200).json(selectedGame?.getAsJSON() || {});
    res.end();
    return;
  }

  if (req.method === "POST") {
    console.log("POST");
    const required = ["lobbyName", "maxPlayers", "columns"];

    if (!req.headers["content-type"] || req.headers["content-type"] !== "application/json") {
      res.status(400);
      res.end();
      return;
    }

    const uuid = uuidv4();
    g_GameManager.createGame(uuid, req.body);
    // if (!validateApi()) {
    //   return;
    // }
    res.json(uuid);
    res.end();
    return;
  }

  res.status(400);
  res.end();
  return;
};

export default SocketHandler;
