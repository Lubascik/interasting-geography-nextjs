import { Server } from "socket.io";
import g_GameManager from "providers/GameManager";

const SocketHandler = (req, res) => {
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
        const gameID = decodeURI(params.gameID)
        if(g_GameManager.games.has(gameID)) {
          socket.emit("get-game", g_GameManager.games.get(gameID).getAsJSON());
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
