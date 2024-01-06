"use server";
import { v4 as uuidv4 } from "uuid";
import DataRow from "./DataRow";

export default class Player {
  uuid = "";
  name = "";
  points = 0;
  active = true;
  rows = [];
  lastSubmitedRound = 0;
  roundFinished = false;

  constructor(name) {
    this.name = name;
    this.uuid = uuidv4();
  }

  addRow({ letter, columns, round }) {
    if (this.lastSubmitedRound === round) {
      return;
    }
    const newRow = new DataRow(letter, round);
    newRow.columns = columns;
    this.rows.push(newRow);
    this.lastSubmitedRound = round;
    this.roundFinished = true;
  }

  setPoints(votes) {
    const row = this.rows.filter((row) => row.round === this.lastSubmitedRound)[0];
    votes.forEach((column) => {
      const id = column[0];
      const points = column[1];

      const dataColumn = row.columns.filter((dataColumn) => dataColumn.id === id)[0];
      dataColumn.data.points = points;
    });
    this.points += row.finalize();
  }
}