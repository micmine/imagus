var Validator = require("jsonschema").Validator;

module.exports = {
	image: function (data) {
		var v = new Validator();

		var schema = {
			"id": "/Image",
			"type": "object",
			"properties": {
				"uuid": { "type": "string" },
				"title": { "type": "string" },
				"status": { "type": "number" },
				"source": { "type": "buffer" }
			},
			"required": [
				"uuid"
			]
		}
	},

}
