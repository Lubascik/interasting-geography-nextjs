export default class Table {
    m_aColumns = []
    m_aRows = []
    constructor(aConfig) {
        if (aConfig.m_aColumns) this.m_aColumns = aConfig.m_aColumns
        if (aConfig.m_aRows) this.m_aRows = aConfig.m_aRows
    }

    get TableTemplate() {
        return this.m_aColumns
    }

    addRow(aRow) {
        // Checking input
        for (let i = 0; i < this.m_aColumns.length; i++) {
            if (!aRow[this.m_aColumns[i]]) return null
        }

        // Adding row
        this.m_aRows.unshift(aRow)
        return aRow
    }

    getRows(nNum) {
        if (!nNum) return this.m_aRows

        return this.m_aRows.filter((val, index) => {
            if (index >= nNum) return true
        })
    }
}
