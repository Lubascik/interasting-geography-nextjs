export default class DataRow {
  letter = "";
  round = 0;
  columns = [];

  constructor(letter, round) {
    this.letter = letter;
    this.round = round;
  }

  addColumn(column) {
    this.columns.push(column);
  }

  /**
   * Calculate result and add it to the row
   */
  finalize() {
    const points = this.columns.map(col => col.data.points).reduce((prev, curr) => prev + curr);
    this.addColumn({
      id: "results",
      round: this.round,
      data: {
        text: "Letter: " + this.letter,
        points: points,
      },
    });
    return points;
  }
}
