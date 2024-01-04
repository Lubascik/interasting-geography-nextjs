'use server'
import Game from "./game/Game";
import {v4 as uuidv4} from "uuid"

class GameManager {
  games = new Map();
  players = new Map(); // Map the players to games for tracking

  constructor() {
    console.log('Game Manager Created');
    
    this.createGame("{b808fcf4-c1d3-4168-a9c9-c18dd97aa751}", {
      columns: [
        "Drzava",
        "Grad",
        "Reka",
        "Ime",
        "Predmet",
        "Zivotinja",
        "Column7",
        "Column8",
        "Column9",
        "Column10",
      ],
    });
  }

  /**
   *
   * @param {*} gameID
   * @param {*} params
   */
  createGame(gameID, params) {
    params.columns = params.columns.map((colName)=> {return {name: colName, id: uuidv4()}})
    this.games.set(gameID, new Game(gameID, params));
  }

  /**
   * 
   * @param {string} gameID 
   * @returns {Game}
   */
  getGame(gameID) {
    return this.games.get(gameID);
  }
}

export default GameManager