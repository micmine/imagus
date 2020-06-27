const Keycloak = require('keycloak-connect');
const session = require('express-session');

class Auth {

	constructor() {
		const instance = this.constructor.instance;
		if (instance) {
			return instance;
		}

		this.constructor.instance = this;
	}

	init (app) {
		this.memoryStore = new session.MemoryStore();
		this.keycloak = new Keycloak({ store: this.memoryStore });
	}

	getKeycloak() {
		return this.keycloak;
	}

	getMemoryStore() {
		return this.memoryStore;
	}
}

module.exports = Auth;
