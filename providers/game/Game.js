"use server";
import Chat from "./Chat";
import Player from "./Player";
import { Server } from "socket.io";

export default class Game {
  static GameState = {
    paused: 0,
    answering: 1,
    voting: 2,
    finished: 3,
  };

  lobbyName = "";
  id = "";
  round = 0;
  currentLetter = "none";
  columns = [];
  chat = new Chat();
  letters = [];

  allowedLetterList = null;
  players = {};
  maxPlayers = 2;
  ownerID = "";

  gameState = Game.GameState.paused;

  /** @type {Server} */
  io = null;

  time = 0;
  timerRunning = false;
  timeLimit = 30 * 1000;
  timeEndVote = 30 * 1000;

  maxRounds = 36; // TODO implement setting on game creation, absolute max should be the length of the letters

  playersReady = [];

  /**
   *
   * @param {string} gameID
   * @param {object} params
   * @param {string[]} params.columns
   * @param {string} params.lobbyName
   * @param {number} params.maxPlayers
   * @param {string} params.allowedLetterList // Optional
   */
  constructor(gameID, params) {
    this.id = gameID;
    this.columns = params.columns;
    if (params.allowedLetterList) {
      this.allowedLetterList = params.allowedLetterList;
    }
    console.log(`A game with id ${gameID} has successfuly been created!`);
  }

  getNewLetter() {
    //TODO filter out already used letters
    //TODO if no more letters available end the game.
    let letters = "ABCDEFGHIJKLMNOPRSTUV".split("");
    // let letters = "AB".split("");
    if (this.allowedLetterList) {
      letters = this.allowedLetterList;
    }
    letters = letters.filter((ch) => !this.letters.includes(ch));
    if (letters.length < 1) {
      this.currentLetter = "none";
      this.endGame();
      return "none";
    }
    const newLetter = letters[Math.floor(Math.random() * letters.length)];
    this.currentLetter = newLetter;
    this.letters.push(newLetter);
    return newLetter;
  }

  endGame() {
    this.gameState = Game.GameState.finished;
    this.io.emit("end-game", {gameData: this.getAsJSON(), playerData: this.PlayerData})
  }

  getAsJSON() {
    return {
      id: this.id,
      currentLetter: this.currentLetter,
      columns: this.columns,
      round: this.round,
      time: this.time,
      owner: this.ownerID,
      gameState: this.gameState,
    };
  }

  setPoints(uuid, votes) {
    const player = this.players[uuid];
    if (player) {
      player.setPoints(votes);
      this.playersReady.push(uuid);
    }

    let allReady = true;
    for (const id in this.players) {
      if (Object.hasOwnProperty.call(this.players, id)) {
        const player = this.players[id];
        if (!this.playersReady.includes(id) && player.online) {
          allReady = false;
          break;
        }
      }
    }

    if (allReady) {
      // End Vote
      this.playersReady = [];
      this.startTimer(this.timeEndVote, this.startRound.bind(this));
      this.io.emit("vote-end", { gameData: this.getAsJSON(), playerData: this.PlayerData });
    } else {
      this.io.emit("update-playerData", this.PlayerData);
    }
  }

  addRow(uuid, values) {
    if (!this.players[uuid]) {
      return;
    }
    if (this.gameState !== Game.GameState.answering) {
      return;
    }

    const player = this.players[uuid];
    player.addRow({ letter: this.currentLetter, columns: values, round: this.round, gameColumns: this.columns });
    this.playersReady.push(uuid);

    let allReady = true;
    for (const id in this.players) {
      if (Object.hasOwnProperty.call(this.players, id)) {
        const player = this.players[id];
        if (!this.playersReady.includes(id) && player.online) {
          allReady = false;
          break;
        }
      }
    }

    if (allReady) {
      this.playersReady = [];
      this.time = 0;
      this.startVote();
      // dont need to send player data back because the startVote will handle that.
      return;
    } else {
      this.startTimer(this.timeLimit, this.endRound.bind(this)); // After the first player finished start the countdown
    }

    return this.PlayerData;
  }

  startVote() {
    if (this.gameState !== Game.GameState.voting) {
      this.gameState = Game.GameState.voting;
      const data = { gameData: this.getAsJSON(), playerData: this.PlayerData };
      this.io.emit("start-vote", data);
    }
  }

  /**
   *
   * @param {number} time the amount of time in ms that the timer will tick for and after which it will call the callback function
   * @param {Function} callback
   * @returns
   */
  startTimer(time, callback) {
    if (this.timerRunning) {
      return;
    }
    this.time = time;
    return new Promise(
      ((resolve) => {
        this.timerRunning = true;
        function tick() {
          this.io.emit("time-tick", this.time);
          if (this.time > 0) {
            setTimeout(() => {
              this.time = Math.max(0, this.time - 1000);
              tick.call(this);
            }, 1000);
          } else {
            resolve();
          }
        }
        tick.call(this);
      }).bind(this)
    ).then(() => {
      this.timerRunning = false;
      callback();
    });
  }

  endRound() {
    this.io.emit("round-end", { gameData: this.getAsJSON(), playerData: this.PlayerData });
  }

  /**
   * @param {Server} io
   */
  startRound() {
    if(this.gameState === Game.GameState.finished) {
      return;
    }
    this.getNewLetter();
    this.round++;
    this.time = this.timeLimit; // Set the time to the time limit so players dont think the time has already run out
    this.gameState = Game.GameState.answering;
    this.io.emit("start-round", { gameData: this.getAsJSON(), playerData: this.PlayerData });
  }

  createPlayer(name, uuid, io) {
    if (io && this.io === null) {
      this.io = io.to(this.id);
    }
    // Players are created after the game so we set the first player as the lobby owner when its created
    let owner = false;
    if (Object.keys(this.players).length === 0) {
      owner = true;
    }

    let player = null;
    if (uuid) {
      if (!this.players[uuid]) {
        player = new Player(name);
        player.uuid = uuid;
        this.players[uuid] = player;
      }
    } else {
      player = new Player(name);
      this.players[player.uuid] = player;
    }

    if (owner) {
      this.ownerID = player.uuid;
      console.log("Set", player.uuid, "as owner for", this.id);
    }
    return player;
  }

  disconnect(uuid) {
    const player = this.players[uuid];
    if (player) {
      player.Offline();
      this.io.emit("update-playerData", this.PlayerData);
    }
  }

  connect(uuid) {
    const player = this.players[uuid];
    if (player) {
      player.Online();
      player.Active();
      this.io.emit("update-playerData", this.PlayerData);
    }
  }

  get Chat() {
    return this.chat;
  }

  get PlayerData() {
    const playerData = [];
    for (const uuid in this.players) {
      if (Object.hasOwnProperty.call(this.players, uuid)) {
        playerData.push(this.players[uuid]);
      }
    }
    return playerData;
  }
}
