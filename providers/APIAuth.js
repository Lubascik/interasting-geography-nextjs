class APIAuth {
  keys = new Map();

  constructor() {
    this.keys.set("4b391ea4-069c-4473-a74d-83c7a90beefe", {
      url: "local",
    });
  }

  validate(apiKey) {
    return this.keys.has(apiKey);
  }
}

export default APIAuth
