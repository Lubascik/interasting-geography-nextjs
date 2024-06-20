"use server";
export default class Chat {
	messages = [];

	addMessage(playerID, content) {
		this.messages.push({ playerID, content });
	}

	getMessages() {
		return this.messages;
	}
}
