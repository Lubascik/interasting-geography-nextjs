"use server";
import Game from "./game/Game";
import { v4 as uuidv4 } from "uuid";
import Player from "./game/Player";
import { Server } from "socket.io";

class GameManager {
  games = new Map();
  players = new Map(); // Map the players to games for tracking
  socketMap = new Map();

  constructor() {
    console.log("Game Manager Created");

    // this.createGame("{b808fcf4-c1d3-4168-a9c9-c18dd97aa751}", {
    //   columns: ["Drzava", "Grad", "Reka", "Ime", "Predmet", "Zivotinja", "Column7", "Column8", "Column9", "Column10"],
    // });
  }

  /**
   *
   * @param {object} params
   * @param {array} params.columns
   */
  createGame(params) {
    const uuid = uuidv4();
    if (!params.columns) {
      return;
    }
    params.columns = params.columns.map((colName) => {
      return { name: colName, id: uuidv4() };
    });
    const game = new Game(uuid, params);
    this.games.set(uuid, game);
    return game;
  }

  /**
   *
   * @param {string} gameID
   * @returns {Game | null}
   */
  getGame(gameID) {
    if (this.games.has(gameID)) {
      return this.games.get(gameID);
    }
    return null;
  }

  createPlayer({ name, gameID, uuid, socketID, io }) {
    if (!gameID || !name || !this.games.has(gameID)) {
      return;
    }

    const game = this.getGame(gameID);
    if (!game) {
      console.log("Game not found while creating a player!");
      return;
    }
    const player = game.createPlayer(name, uuid, io);

    this.addPlayer({ uuid: player.uuid, name, gameID, socketID });
    return player;
  }

  getPlayerUUID(socketID) {
    if (this.socketMap.has(socketID)) {
      const uuid = this.socketMap.get(socketID);
      return uuid;
    }
    return;
  }

  removeSocket(socketID) {
    this.socketMap.delete(socketID);
  }

  addPlayer({ uuid, name, gameID, socketID }) {
    if (this.players.has(uuid) && gameID) {
      const playerInfo = this.players.get(uuid);
      if (!playerInfo.games.includes(gameID)) {
        playerInfo.games.push(gameID);
        this.players.set(uuid, playerInfo);
      }
    } else {
      this.players.set(uuid, { name, games: gameID ? [gameID] : [] });
    }
    this.socketMap.set(socketID, uuid);
  }
}

export default GameManager;
