"use server";
export default class Chat {
  chats = [];

  constructor() {}

  addMessage(playerID, content) {
    this.chats.push({ playerID, content });
  }

  getMessages() {
    return this.chats;
  }
}
