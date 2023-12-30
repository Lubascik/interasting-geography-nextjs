import Chat from "./Chat";
import Player from "./Player";

export default class Game {
  id = "";
  round = 1;
  currentLetter = "A";
  columns = [];
  chat = new Chat();
  letters = [];
  timeLimit = 0;
  allowedLetterList = null;
  players = new Map();

  constructor(gameID, params) {
    this.id = gameID;
    this.columns = params.columns;
    if (params.allowedLetterList) {
      this.allowedLetterList = params.allowedLetterList;
    }
    this.getNewLetter();
  }

  getNewLetter() {
    //TODO filter out already used letters
    //TODO if no more letters available end the game.
    let letters = "";
    if (this.allowedLetterList) {
      letters = this.allowedLetterList;
    } else {
      letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    const newLetter = letters[Math.floor(Math.random() * letters.length)];
    this.currentLetter = newLetter;
    this.letters.push(newLetter);
    return newLetter;
  }

  getAsJSON() {
    return JSON.stringify(
      {
        id: this.id,
        currentLetter: this.currentLetter,
        columns: this.columns,
        round: this.round,
        timeLimit: this.timeLimit,
      },
      null,
      2
    );
  }

  getOrCreatePlayer(UUID, {name, color}) {
    if(this.players.has(UUID)) {
        return this.players.get(UUID)
    } else {
        this.createPlayer({name, color})
    }
  }

  createPlayer({name, color}) {
    const player = new Player({name, color});
    this.players.set(player.uuid, player);
    return player;
  }

  get PlayerUUIDs() {
    const playerUUIDs = []
    for (const key of this.players.keys()) {
        playerUUIDs.push(key)
    }
    return playerUUIDs
  }

  get Chat() {
    return this.chat;
  }
}
