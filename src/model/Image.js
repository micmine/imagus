const mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
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
		type: String,
	},
	status: {
		type: Number,
		default: 1
	}
});

imageSchema.plugin(textSearch);
imageSchema.index({ title: "text" });

module.exports = mongoose.model('Image', imageSchema);
