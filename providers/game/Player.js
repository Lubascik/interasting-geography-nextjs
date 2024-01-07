"use server";
import { v4 as uuidv4 } from "uuid";
import DataRow from "./DataRow";

export default class Player {
  uuid = "";
  online = true;
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

  Online(online = true) {
    this.online = online
  }

  Offline(online = false) {
    this.online = online
  }

  Active(active = true) {
    this.active = active
  }

  Inactive(active = false) {
    this.active = active
  }

  addRow({ letter, columns, round, gameColumns }) {
    if (this.lastSubmitedRound === round) {
      return;
    }
    const newRow = new DataRow(letter, round);
    for (const column of gameColumns) {
      const playerCol = columns.filter((col) => col.id === column.id)[0];
      if (!playerCol) {
        columns.push({ id: column.id, data: { text: "", points: 0 } });
      } else if (playerCol.data.text.trim().length === 0) {
        playerCol.data.text = "";
        playerCol.data.points = 0;
      }
    }
    newRow.columns = columns;
    this.rows.push(newRow);
    this.lastSubmitedRound = round;
    this.roundFinished = true;
  }

  setPoints(votes) {
    const row = this.rows.filter((row) => row.round === this.lastSubmitedRound)[0];
    if(row) {
      votes.forEach((column) => {
        const id = column[0];
        const points = column[1];
  
        const dataColumn = row.columns.filter((dataColumn) => dataColumn.id === id)[0];
        dataColumn.data.points = points;
      });
      this.points += row.finalize();
    }
  }
}
