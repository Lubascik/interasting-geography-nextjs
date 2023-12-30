import Game from "./game/Game";

class GameManager {
  games = new Map();
  players = new Map(); // Map the players to games for tracking

  constructor() {
    this.createGame("{b808fcf4-c1d3-4168-a9c9-c18dd97aa751}", {
      columns: [
        { name: "Drzava", id: "{e03e867b-bc61-4e3a-8c53-69908a299449}" },
        { name: "Grad", id: "{5d0d419d-93f5-44c7-8d11-bf56df419522}" },
        { name: "Reka", id: "{f5a1583a-2bcb-4dd0-b506-0b9f8cb4064e}" },
        { name: "Ime", id: "{ba3bcc33-fd46-4040-9023-8ad272e02655}" },
        { name: "Predmet", id: "{ef9aad26-9353-4292-a574-4c13a327d790}" },
        { name: "Zivotinja", id: "{52718f3d-a8c3-4c09-b8f1-c471065178cd}" },
        { name: "Column7", id: "{8a2e504e-340e-4ae1-a410-1bb8a9f5b442}" },
        { name: "Column8", id: "{cf154b08-07ab-41e6-a053-8bbe6f2cd0cf}" },
        { name: "Column9", id: "{092c08ee-093a-474d-827b-a70daabb1ed8}" },
        { name: "Column10", id: "{2d4bf4b8-0d3e-4778-8e17-d7f082c50c4a}" },
      ],
    });
  }

  /**
   *
   * @param {*} gameID
   * @param {*} params
   */
  createGame(gameID, params) {
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

const g_GameManager = new GameManager();

export default g_GameManager;
