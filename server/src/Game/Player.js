import Table from "./Table.js"
export default class Player {
    m_sUsername = null
    m_nPoints = 0
    m_nStatus = Player.STATUS.ACTIVE
    m_aTable = null
    constructor(aConfig) {
        if (aConfig.m_sUsername) this.m_sUsername = aConfig.m_sUsername
        if (aConfig.m_nPoints) this.m_nPoints = aConfig.m_nPoints
        if (aConfig.m_nStatus) this.m_nStatus = aConfig.m_nStatus
        if (aConfig.m_aTable) this.m_aTable = new Table(aConfig.m_aTable)
    }

    get status() {
        return this.m_nStatus
    }

    get username() {
        return this.m_sUsername
    }

    get points() {
        return this.m_nPoints
    }

    setInactive() {
        this.m_sStatus = Player.STATUS.INACTIVE
    }

    setActive() {
        this.m_sStatus = Player.STATUS.ACTIVE
    }

    getTable() {
        return this.m_aTable
    }
}

Player.STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
}
