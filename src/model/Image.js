const mongoose = require('mongoose');
require("../controller/Database");

const imageSchema = new mongoose.Schema({
	uuid: {
		type: String
	},
	title: {
		type: String,
		trim: true
	},
	source: {
		type: Buffer,
	},
	status: {
		type: Number,
		default: 1
	}
});

module.exports = mongoose.model('Image', imageSchema);
