import Player from "../Player.js"

export default class PlayerInterface {
    constructor(m_sUsername, m_nPoints, m_nStatus, m_aTable) {
        this.m_sUsername = m_sUsername
        this.m_nPoints = m_nPoints || 0
        this.m_nStatus = m_nStatus || Player.STATUS.ACTIVE
        this.m_aTable = m_aTable
    }
}
