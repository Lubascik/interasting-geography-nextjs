import ErrorMessage from "../API/ErrorMessages.js"
import PlayerInterface from "./Interfaces/PlayerInterface.js"
import TableInterface from "./Interfaces/TableInterface.js"
import Player from "./Player.js"
import Table from "./Table.js"

export default class Game {
    m_aPlayers = new Map()
    m_aTableTemplate = null
    m_sGameID = null
    m_nRound = 0
    m_eGameState = Game.STATE_INPUT
    m_sLetter = "A"
    constructor(aConfig) {
        if (aConfig.m_aPlayers) {
            for (const key in aConfig.m_aPlayers) {
                if (Object.hasOwnProperty.call(aConfig.m_aPlayers, key)) {
                    const player = aConfig.m_aPlayers[key]
                    const newPlayer = new Player(player)
                    this.m_aPlayers.set(key, newPlayer)
                }
            }
        }
        if (aConfig.m_aTableTemplate) this.m_aTableTemplate = aConfig.m_aTableTemplate
        if (aConfig.m_sGameID) this.m_sGameID = aConfig.m_sGameID
        if (aConfig.m_nRound) this.m_nRound = aConfig.m_nRound
        if (aConfig.m_sLetter) this.m_sLetter = aConfig.m_sLetter
    }

    removePlayer(sUUID) {
        if (this.m_aPlayers[sUUID] !== undefined) {
            this.m_aPlayers[sUUID].setInactive()
        } else {
            throw new Error(ErrorMessage.NOT_INGAME)
        }
    }

    nextRound() {
        this.m_nRound = this.m_nRound++
    }

    addPlayer(sUUID, sUsername) {
        const aPlayer = this.m_aPlayers[sUUID]
        if (!aPlayer) {
            const aNewPlayer = new Player(new PlayerInterface(sUsername, 0, Player.STATUS.ACTIVE, new Table(new TableInterface(this.TableTemplate))))
            this.m_aPlayers[sUUID] = aNewPlayer
            return aNewPlayer
        } else {
            aPlayer.setActive()
            return aPlayer
        }
    }

    checkPlayersDone() {
        for (const iterator of this.m_aPlayers.entries()) {
            console.log(iterator)
        }
    }

    submitAnswer(aRow, sUUID) {
        // mark player as done and make him wait for rest of players to finish
        // check if all players finished
        // mark game state as
    }

    getPlayer(sUUID) {
        if (!this.m_aPlayers[sUUID]) return null
        return this.m_aPlayers[sUUID]
    }

    get round() {
        return this.m_nRound
    }
    get TableTemplate() {
        return this.m_aTableTemplate
    }
}

Game.MIN_COLUMNS = 5
Game.STATE_INPUT = 0
Game.STATE_VOTE = 1
