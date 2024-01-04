export default class DataRow {
  letter = "";
  columns = [];

  constructor(letter) {
    this.letter = letter;
  }

  addColumn(column) {
    this.columns.push(column);
  }

  /**
   * Calculate result and add it to the row
   */
  finalize() {
    const points = this.columns.reduce((prev, curr, index) => {
      return prev + curr.data.points;
    });
    this.addColumn({
      id: "results",
      data: {
        text: "Letter: " + this.letter,
        points: points,
      },
    });
  }
}
