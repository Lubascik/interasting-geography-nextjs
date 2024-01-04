'use server'
import uuidv5 from "uuidv5"

const uuidNamespace = "Interasting Geography"

export default class Player {
    uuid = ""
    name
    points
    color
    active
    data = {
        rows: []
    }

    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.uuid = uuidv5(null, uuidNamespace);
    }
}