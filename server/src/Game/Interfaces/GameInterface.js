export default class GameInterface {
    constructor(m_aTableTemplate, m_sGameID, m_aPlayers, m_nRound) {
        this.m_aTableTemplate = m_aTableTemplate
        this.m_sGameID = m_sGameID
        this.m_aPlayers = m_aPlayers || {}
        this.m_nRound = m_nRound || 1
    }
}
