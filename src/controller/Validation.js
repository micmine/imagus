var Validator = require("jsonschema").Validator;

module.exports = {
	upload: function (data) {
		var v = new Validator();

		var schema = {
			"id": "/Image",
			"type": "object",
			"properties": {
				"title": { "type": "string" },
				"source": { "type": "string" }
			},
			"required": [
				"title", "source"
			]
		}
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	},
	uploadFile: function (data) {
		var v = new Validator();

		var schema = {
			"id": "/Image",
			"type": "object",
			"properties": {
				"title": { "type": "string" },
			},
			"required": [
				"title"
			]
		}
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	},
	get: function (data) {
		var v = new Validator();

		var schema = {
			"id": "/Image",
			"type": "object",
			"properties": {
				"uuid": { "type": "string" },
				"title": { "type": "string" },
				"status": { "type": "number" },
				"source": { "type": "string" }
			},
			"required": [
				"uuid"
			]
		}
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	},

	search: function (data) {
		var v = new Validator();

		var schema = {
			"id": "/Image",
			"type": "object",
			"properties": {
				"uuid": { "type": "string" },
				"title": { "type": "string" },
				"status": { "type": "number" },
				"source": { "type": "string" }
			},
		}
		var result = v.validate(data, schema);

		if (result.valid) {
			return true;
		} else {
			return result;
		}
	},

}
